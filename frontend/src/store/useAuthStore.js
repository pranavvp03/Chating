import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios'
import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        console.log("Checking auth...");
        try {
            const response = await axiosInstance.get('/auth/check');
            set({ authUser: response.data });
        } catch (error) {
            console.error('Error checking auth:', error.response?.data || error.message);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/auth/signup', data);
            set({ authUser: response.data });
            toast.success("Account created successfully")
           
        } catch (error) {
            toast.error(error.response.data.message)
            console.log('Error in sign-up:', error.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    Login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post('/auth/login', data);
            set({ authUser: response.data });
            toast.success("Logged in successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log('Error in login:', error.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () =>{
        try {
           await axiosInstance.post('/auth/logout');
           set({authUser: null})
           toast.success("Logout successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    },

    
    // Additional methods for updating profile, logging out, etc. can be added here.
}));
