import { create } from "zustand";

const useUserStore = create((set,get)=>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,

    checkSession: async () => {
        set({isLoading:true});
        try{
            const res = await fetch('http://localhost:5000/api/auth/session',{
                credentials:'include',
            });
            if(res.status==200){
                const data = await res.json();
                set({
                    user:data.user,
                    error:null,
                    isAuthenticated:true,
                    isLoading:false,
                });
            }else{
                set({
                    user:null,
                    error:data.error,
                    isAuthenticated:false,
                    isLoading:false,
                });
            }
        }catch(err){
            set({
                user:null,
                error:err.message,
                isAuthenticated:false,
                isLoading:false,
            })
        }
    },

    login: async (user_name, pass) => {
        set({isLoading:true})
        const userData = {
            user_name: user_name,
            pass: pass,
        }
        try{
            const res = await fetch("http://localhost:5000/api/auth/login",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                credentials:'include',
                body:JSON.stringify(userData)
            });
            const data = await res.json();
            if(res.ok){
                set({
                    user: data,
                    error:null,
                    isLoading:false,
                    isAuthenticated:true,
                })
            }else{
                set({
                    user:null,
                    error:data.error,
                    isLoading: false,
                    isAuthenticated:false,
                })
            }
        }catch(err){
            console.log("Login err: ",err);
            set({
                user: null,
                error:err.message,
                isLoading:false,
                isAuthenticated:false,
            })
        }
    },

    signup: async (user_name, pass, display_name) => {
        set({isLoading:true})
        const userData = {
            user_name: user_name,
            pass: pass,
            display_name: display_name,
        }
        try{
            const res = await fetch("http://localhost:5000/api/auth/signup",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                credentials:'include',
                body: JSON.stringify(userData),
            })
            const data = await res.json();
            if(res.ok){
                set({
                    user: data,
                    error: null,
                    isLoading:false,
                    isAuthenticated:true,
                })
            }else{
                set({
                    user: null,
                    error:data.error,
                    isLoading:false,
                    isAuthenticated:false,
                })
            }
        }catch(err){
            console.log("Sign-up error: ",err);
            set({
                user:null,
                error:err.message,
                isLoading:false,
                isAuthenticated:false,
            })
        }finally{
            set({isLoading:false})
        }
    },
    logout: async () => {
        set({isLoading:true});
        try{
            const res = await fetch("http://localhost:5000/api/auth/logout",{
                method:'POST',
                credentials:'include',
            })
            const data = await res.json();
            if(res.ok){
                set({
                    user:null,
                    isAuthenticated: false,
                    error:null,
                    isLoading:false,
                })
            }else{
                set({
                    error:data.error,
                    isLoading:false,
                })
            }
        }catch(err){
            console.log("logout error: ",err.message);
            set({
                error:err.message,
                isLoading:false,
            })
        }
    }
}))

export default useUserStore;