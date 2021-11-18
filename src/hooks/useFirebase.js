import { useEffect, useState } from "react";
import initializeAuthentication from "../components/Pages/Login/Firebase/firebase.init";
//step-5
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, getIdToken } from "firebase/auth";

//step-3
initializeAuthentication();

//step-1
const useFirebase = () => {

    //step-4
    const [user, setUser] = useState({});

    //step -12
    const [isLoading, setIsLoading] = useState(true);

    const [success, setSuccess] = useState('');
    //step-14

    const [authError, setAuthError] = useState('');
    const [passError, setPassError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');

    //step-7
    const auth = getAuth();

    //step-15
    const googleProvider = new GoogleAuthProvider();

    //step-16

    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const destination = location.state?.from || '/home'
                history.replace(destination);
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT')
                setAuthError('');

            }).catch((error) => {
                
            })
            .finally(() => setIsLoading(false));
    }



    //step-6
    const registerUser = (email, password, name, history, setMatch) => {
        setIsLoading(true);
        //step-8
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = { email, displayName: name };
                setUser(newUser);
                //save user to the database
                saveUser(email, name, 'POST');

                //send name to firebase
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                });

                const destination = '/home'
                setSuccess('User Regestration Succesfull!')
                history.replace(destination);
                setAuthError('');
                setPassError('');
            })
            .catch(() => {
                setAuthError('Email Already In Use!');
                setPassError('');
                setSuccess('');
                setMatch('');
                // ..
            })
            .finally(() => setIsLoading(false));
    }

    //step - 11

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)

            .then((userCredential) => {
                const destination = location.state?.from || '/home'
                history.replace(destination);
                setSuccess('User Login Succesfull!')
                setPassError('');
                setAuthError('');

            })
            .catch((error) => {
                setPassError("Your Email or Password Could Be Incorrect");
                setAuthError('');
                setSuccess('');
            })
            .finally(() => setIsLoading(false));
    }


    //step-10

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken)
                    })

            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])


    useEffect(() => {
        fetch(`http://localhost:5000/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])



    //step-9
    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setSuccess('');
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {

            })
    }





    return {
        //step-5
        user,
        admin,
        token,
        isLoading,
        success,
        setAuthError,
        authError,
        passError,
        signInWithGoogle,
        registerUser,
        loginUser,
        logOut,

    }
}

//step-2
export default useFirebase;