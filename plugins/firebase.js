// firebase.js
import { firebaseConfig } from '../configs/firebaseConfig.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL ,deleteObject} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage,ref,uploadBytes, getDownloadURL ,deleteObject};
