import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Job Applications Collection
export const COLLECTIONS = {
  APPLICATIONS: 'applications',
  USERS: 'users',
  JOBS: 'jobs'
};

// Submit a job application
export const submitJobApplication = async (applicationData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.APPLICATIONS), {
      ...applicationData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log('Application submitted with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting application: ', error);
    throw error;
  }
};

// Get all applications (for admin)
export const getAllApplications = async () => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.APPLICATIONS),
        orderBy('createdAt', 'desc')
      )
    );
    const applications = [];
    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return applications;
  } catch (error) {
    console.error('Error getting applications: ', error);
    throw error;
  }
};

// Get applications by user ID
export const getUserApplications = async (userId) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.APPLICATIONS),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )
    );
    const applications = [];
    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return applications;
  } catch (error) {
    console.error('Error getting user applications: ', error);
    throw error;
  }
};

// Update application status
export const updateApplicationStatus = async (applicationId, status) => {
  try {
    const applicationRef = doc(db, COLLECTIONS.APPLICATIONS, applicationId);
    await updateDoc(applicationRef, {
      status: status,
      updatedAt: serverTimestamp()
    });
    console.log('Application status updated');
  } catch (error) {
    console.error('Error updating application status: ', error);
    throw error;
  }
};

// Create or update user profile
export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });
    console.log('User profile updated');
  } catch (error) {
    // If document doesn't exist, create it
    try {
      await addDoc(collection(db, COLLECTIONS.USERS), {
        userId: userId,
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log('User profile created');
    } catch (createError) {
      console.error('Error creating user profile: ', createError);
      throw createError;
    }
  }
};

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No user profile found');
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile: ', error);
    throw error;
  }
};

// Add predefined job positions
export const addJobPositions = async () => {
  const positions = [
    {
      title: 'Content Writer',
      type: 'Part-time',
      skills: ['Content Writing', 'SEO', 'Research'],
      description: 'Create engaging content for blogs, websites, and social media.',
      requirements: [
        'Excellent writing and communication skills',
        'Knowledge of SEO best practices',
        'Ability to research and write on various topics',
        'Experience with content management systems'
      ],
      isActive: true,
      createdAt: serverTimestamp()
    },
    {
      title: 'Social Media Manager',
      type: 'Part-time',
      skills: ['Social Media', 'Content Creation', 'Analytics'],
      description: 'Manage social media presence and create engaging campaigns.',
      requirements: [
        'Experience with major social media platforms',
        'Strong visual design skills',
        'Knowledge of social media analytics',
        'Creative thinking and trend awareness'
      ],
      isActive: true,
      createdAt: serverTimestamp()
    },
    {
      title: 'Web Developer',
      type: 'Part-time',
      skills: ['HTML/CSS', 'JavaScript', 'React'],
      description: 'Build and maintain modern, responsive websites.',
      requirements: [
        'Proficiency in HTML, CSS, and JavaScript',
        'Experience with React or similar frameworks',
        'Understanding of responsive design principles',
        'Knowledge of version control (Git)'
      ],
      isActive: true,
      createdAt: serverTimestamp()
    },
    {
      title: 'Digital Marketing Specialist',
      type: 'Part-time',
      skills: ['SEO', 'PPC', 'Analytics'],
      description: 'Drive online growth through strategic digital marketing.',
      requirements: [
        'Experience with Google Ads and Facebook Ads',
        'Knowledge of SEO and SEM',
        'Proficiency in Google Analytics',
        'Understanding of conversion optimization'
      ],
      isActive: true,
      createdAt: serverTimestamp()
    },
    {
      title: 'Graphic Designer',
      type: 'Part-time',
      skills: ['Photoshop', 'Illustrator', 'Canva'],
      description: 'Create stunning visual content for various platforms.',
      requirements: [
        'Proficiency in Adobe Creative Suite',
        'Strong portfolio of design work',
        'Understanding of brand guidelines',
        'Experience with web and print design'
      ],
      isActive: true,
      createdAt: serverTimestamp()
    },
    {
      title: 'Virtual Assistant',
      type: 'Part-time',
      skills: ['Admin Tasks', 'Communication', 'Organization'],
      description: 'Provide administrative support and help streamline operations.',
      requirements: [
        'Excellent organizational skills',
        'Strong communication abilities',
        'Proficiency in office software',
        'Ability to work independently'
      ],
      isActive: true,
      createdAt: serverTimestamp()
    }
  ];

  try {
    for (const position of positions) {
      await addDoc(collection(db, COLLECTIONS.JOBS), position);
    }
    console.log('Job positions added successfully');
  } catch (error) {
    console.error('Error adding job positions: ', error);
    throw error;
  }
};

// Get all active job positions
export const getJobPositions = async () => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.JOBS),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      )
    );
    const jobs = [];
    querySnapshot.forEach((doc) => {
      jobs.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return jobs;
  } catch (error) {
    console.error('Error getting job positions: ', error);
    throw error;
  }
};
