const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const fetch = require('node-fetch');

// In-memory token storage (in production, use Redis or DB)
const activeTokens = new Map();

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.warn('⚠️ Telegram bot credentials not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env');
}

// Generate and send admin token via Telegram
router.post('/request-admin-token', async (req, res) => {
  try {
    // Generate custom token for admin UID
    const adminUID = 'secure-admin-uid-2024';
    const customClaims = {
      role: 'admin',
      isAdmin: true,
      tokenType: 'telegram-admin'
    };

    const customToken = await admin.auth().createCustomToken(adminUID, customClaims);
    
    // Store token with expiration (2 minutes)
    const tokenData = {
      token: customToken,
      created: Date.now(),
      used: false,
      expiresAt: Date.now() + (2 * 60 * 1000) // 2 minutes
    };
    
    activeTokens.set(customToken, tokenData);
    
    // Auto-cleanup expired token
    setTimeout(() => {
      activeTokens.delete(customToken);
    }, 2 * 60 * 1000);

    // Send token via Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      await sendTokenToTelegram(customToken);
    } else {
      console.log('🔐 Admin Token (Telegram not configured):', customToken);
    }

    res.json({ 
      success: true, 
      message: 'Admin token generated and sent to Telegram. Check your messages.' 
    });

  } catch (error) {
    console.error('Error generating admin token:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate admin token' 
    });
  }
});

// Send token to Telegram
async function sendTokenToTelegram(token) {
  try {
    const message = `🔐 *Admin Login Token*\n\n\`${token}\`\n\n⏰ Valid for 2 minutes or until used.\n🚫 Do not share this token.`;
    
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`);
    }

    console.log('✅ Admin token sent to Telegram successfully');
  } catch (error) {
    console.error('❌ Failed to send token to Telegram:', error);
  }
}

// Validate and mark token as used (internal use)
router.post('/validate-token', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ valid: false, message: 'Token required' });
    }

    const tokenData = activeTokens.get(token);
    
    if (!tokenData) {
      return res.status(400).json({ valid: false, message: 'Token not found or expired' });
    }

    if (tokenData.used) {
      return res.status(400).json({ valid: false, message: 'Token already used' });
    }

    if (Date.now() > tokenData.expiresAt) {
      activeTokens.delete(token);
      return res.status(400).json({ valid: false, message: 'Token expired' });
    }

    // Mark token as used
    tokenData.used = true;
    
    // Remove token after use
    setTimeout(() => {
      activeTokens.delete(token);
    }, 1000);

    res.json({ valid: true, message: 'Token is valid' });

  } catch (error) {
    console.error('Error validating token:', error);
    res.status(500).json({ valid: false, message: 'Token validation failed' });
  }
});

// Get active tokens count (for monitoring)
router.get('/token-stats', (req, res) => {
  const now = Date.now();
  const activeCount = Array.from(activeTokens.values()).filter(
    token => !token.used && now < token.expiresAt
  ).length;
  
  res.json({
    activeTokens: activeCount,
    totalGenerated: activeTokens.size
  });
});

module.exports = router;
