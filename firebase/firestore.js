import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';
import { Unsubscribe } from '@mui/icons-material';

const RECEIPTS_COLLECTION = 'receipts';

export function addReceipt(uid, date, locationName, address, items, amount, imageBucket){
    addDoc(collection(db, RECEIPTS_COLLECTION), {uid, date, locationName, address, items, amount, imageBucket})
}

export async function getReceipts(uid, setReceipts, setIsLoadingReceipts) {
    const receiptsQuery = query(collection(db, RECEIPTS_COLLECTION), where("uid", "==", uid), orderBy("date", "desc"))

    const unsubscribe = onSnapshot(receiptsQuery, async (snapshot) => {
        let allReceipts = [];
        for (const documentSnapshot of snapshot.docs){
            const receipt = documentSnapshot.data();
            await allReceipts.push({
                ...receipt,
                date: receipt['date'].toDate(),
                id: documentSnapshot.id,
                imageUrl: await getDownloadURL(receipt['imageBucket'])
            });
        }
        setReceipts(allReceipts);
        setIsLoadingReceipts(false);
    });
    return unsubscribe;
}


export function updateReceipt(docId, uid, date, locationName, address, items, amount, imageBucket){
    setDoc(doc(db, RECEIPTS_COLLECTION, docId), { uid, date, locationName, address, items, amount, imageBucket})
} 

export function deleteReceipt(id){
    deleteDoc(doc(db, RECEIPTS_COLLECTION, id));
}