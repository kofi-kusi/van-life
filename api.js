import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, query, where, doc } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDHbqAgUhQqT13qr2eh1d2GvjXNf0AwhGU",
  authDomain: "vanlife-63f1c.firebaseapp.com",
  projectId: "vanlife-63f1c",
  storageBucket: "vanlife-63f1c.firebasestorage.app",
  messagingSenderId: "1037959484918",
  appId: "1:1037959484918:web:38956db2463073d53163d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


const vansCollectionRef = collection(db, "vans")



export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    return vans
}

export async function getVan(id) {
    const vanRef = doc(db, "vans", id)
    const snapshot = await getDoc(vanRef)
    return { ...snapshot.data(), id: snapshot.id }
}

//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function getHostVans(id) {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    return vans
}

// {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}