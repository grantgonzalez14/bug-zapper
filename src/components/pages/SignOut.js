import firebase from 'firebase/compat/app';
import 'firebase/auth';

function SignOut() {
    const auth = firebase.auth();

    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export default SignOut;