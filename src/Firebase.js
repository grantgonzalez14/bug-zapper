import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile, updateEmail } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD0obPc94tYkfr5FYI6838cjGWeeZ9mYPc",
    authDomain: "bug-zapper-885cb.firebaseapp.com",
    projectId: "bug-zapper-885cb",
    storageBucket: "bug-zapper-885cb.appspot.com",
    messagingSenderId: "291408418050",
    appId: "1:291408418050:web:3d9ea406ab0aa31c885e1b",
    measurementId: "G-340LXWQB6B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } 
    catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });

        await updateProfile(user, {
            displayName: name
        });
    } 
    catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

const addNewTask = async (task) => {
    try {
        const user = auth.currentUser;

        const docRef = await addDoc(collection(db, 'tasks'), {
            uid: user.uid,
            title: task.title,
            status: 'to-do',
            completed: task.completed
        });

        await updateDoc(docRef, {id: docRef.id});
    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const removeTask = async (task) => {
    try {
        await deleteDoc(doc(db, 'tasks', task.id));
    }
    catch (err) {
        console.error(err);
        alert(err);
    }
}

const changeTaskStatus = async (task, newStatus) => {
    try {
        const docRef = doc(db, 'tasks', task.id);
        await updateDoc(docRef, {status: newStatus})
    }
    catch (err) {
        console.error(err);
        alert(err);
    }
}

const getTaskList = async () => {
    try {
        const user = auth.currentUser;
        const q = query(collection(db, 'tasks'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        let taskList = {};
        let taskListToDo = [];
        let taskListInProgress = [];
        let taskListResolved = [];

        querySnapshot.forEach((doc) => {
            if (doc.data().status === 'to-do') {
                taskListToDo.push(doc.data());
            }
            else if (doc.data().status === 'in-progress') {
                taskListInProgress.push(doc.data());
            }
            else if (doc.data().status === 'resolved') {
                taskListResolved.push(doc.data());
            }
        });

        taskList = {
            toDo: taskListToDo,
            inProgress: taskListInProgress,
            resolved: taskListResolved
        }

        return taskList;
    }
    catch (err) {
        console.error(err);
        alert(err.message);
        return [];
    }
}

const editInformation = async (field, info) => {
    try {
        const user = auth.currentUser;

        if (field === 'name') {
            await updateProfile(user, {
                displayName: info
            });
        }
        else if (field === 'email') {
            await updateEmail(user, info);
        }
    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
}

export { 
    auth, 
    db, 
    logInWithEmailAndPassword, 
    registerWithEmailAndPassword, 
    sendPasswordReset, 
    logout, 
    addNewTask, 
    removeTask,
    changeTaskStatus,
    getTaskList,
    editInformation
};