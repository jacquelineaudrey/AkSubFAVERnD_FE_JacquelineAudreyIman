import { useEffect, useState, useRef } from "react";
import app from "./firebaseConfig";
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  update,
  remove,
} from "firebase/database";
import "./index.css";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import Form from "./components/Form";
import Flag from "./pages/Flag";

export default function App() {
  // State buat simpen data
  const [searchVal, setSearchVal] = useState("");

  // State / variabel buat simpen data dari firebase 
  const [data, setData] = useState([]);

  const [newCountry, setNewCountry] = useState({
    flag: "",
    name: "",
    population: "",
    capital: "",
  });
  const [flagFile, setFlagFile] = useState(null);

  // Select input formnya file
  const fileInputRef = useRef(null);

  // Kita pake useEffect soalnya fetching itu baru bisa setelah fase "mounting" component kelar
  useEffect(() => {
    fetchData();
  }, []);

  // Ngambil data negara yang udah dikirim
  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "countries/");
    
    const snapshot = await get(dbRef);
    
    if (snapshot.exists()) {
      // Kalo datanya ada baru nyimpen
      const fetchedData = snapshot.val();
      const formattedData = Object.keys(fetchedData).map((key) => ({
        id: key,
        // Spread operator
        ...fetchedData[key],
      }));

      // Data yang diambil di simpen di state yang tdi di atas
      setData(formattedData);
    } else {
      // Display error...
    }
  };

  const handleAddCountry = async () => {
    let flagURL = "";

    // Buat gambarnya doang
    if (flagFile) {
      // Ini kode "boilerplate" dari firebase
      // Ini kodenya harus ada biar firebasenya jalan
      const storage = getStorage(app);
      const storageRefInstance = storageRef(storage, `flags/${flagFile.name}`);
      
      // Send HTTP Request buat UPLOAD GAMBAR
      // Upload ke server
      await uploadBytes(storageRefInstance, flagFile);
      
      // Request Download gambar yang udah diupload
      // Download DARI server
      flagURL = await getDownloadURL(storageRefInstance);
    }

    // Bikin object baru pake data yang barusan diupload
    const newCountryWithFlag = {
      ...newCountry,
      flag: flagURL,
    };

    const db = getDatabase(app);
    const dbRef = ref(db, "countries/");
    const newCountryRef = push(dbRef);

    // Save object country barunya ke database
    // Upload ke servernya
    await set(newCountryRef, newCountryWithFlag);

    // Download dari server
    fetchData();

    // Set data di client
    setNewCountry({
      flag: "",
      name: "",
      population: "",
      capital: "",
    });
    setFlagFile(null);
    fileInputRef.current.value = null;
  };

  const handleUpdateCountry = async (id, updatedCountry, flagFile) => {
    if (flagFile) {
      const storage = getStorage(app);
      const storageRefInstance = storageRef(storage, `flags/${flagFile.name}`);
      await uploadBytes(storageRefInstance, flagFile);
      const flagURL = await getDownloadURL(storageRefInstance);
      updatedCountry.flag = flagURL;
    }

    const db = getDatabase(app);
    const dbRef = ref(db, `countries/${id}`);

    // update data
    await update(dbRef, updatedCountry);
    
    // Buar prevent stale Data
    // Stale data -> yg sblum diupdate
    fetchData();
  };

  const handleDeleteCountry = async (id) => {
    const db = getDatabase(app);
    const dbRef = ref(db, `countries/${id}`);

    // delete data
    await remove(dbRef);
    fetchData();
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="container">
      <Form
        flagFile={flagFile}
        setFlagFile={setFlagFile}
        newCountry={newCountry}
        setNewCountry={setNewCountry}
        handleAddCountry={handleAddCountry}
        fileInputRef={fileInputRef}
      />
      <Flag
        data={filteredData}
        setSearchVal={setSearchVal}
        searchVal={searchVal}
        onUpdate={handleUpdateCountry}
        onDelete={handleDeleteCountry}
      />
    </div>
  );
}
