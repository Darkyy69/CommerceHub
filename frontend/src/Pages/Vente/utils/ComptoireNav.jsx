import React,{useState,useEffect,useRef,useContext} from 'react'
import axios from 'axios';
import { FaSearch ,FaPlus, FaMinus,FaPen,FaUser,FaTimes,FaCalculator } from 'react-icons/fa';
import { useData } from './DataProvider';

export default function ComptoireNav() {
    const [client,setClient] = useState("");
    const [listeBon,setListeBon]=useState(false);
    const [input,setInput] = useState({})
    const [prix,setPrix]=useState();
    const [modifierBon,setModifierBon]=useState(false);
    const [AjouterBon,setAjouterBon]=useState(false);
    const [dateEtHeureActuelles, setDateEtHeureActuelles] = useState(getCurrentDateTime());
    const {setShowCalculatrice} = useData();
    const {PrixRef}=useData()
    const {setInfoArticle}=useData()
    

    const HandelInput=(e)=>{
      e.preventDefault();
      const name=e.target.name
      const value=e.target.value
      setInput(item=>({...item,[name]:value}))
    }
    
    const onClientSelect = (e)=>{
      setClient(e.target.value);
    }

    useEffect(() => {
      // Mettre à jour la date toutes les secondes
      const interval = setInterval(() => {
        setDateEtHeureActuelles(getCurrentDateTime());
      }, 1000);
      // Nettoyer l'intervalle lors du démontage du composant
      return () => clearInterval(interval);
    }, []);

    useEffect(()=>{
      axios.get('http://127.0.0.1:8000/api/comptoire/entite-personnes/client/')
      .then(res=>setClient(res.data))
      .catch(err=>console.log(err))
    },[]) 

    const HandelArticl = (e) => {
      e.preventDefault();
      const selectedValue = e.target.value;
      // Vérifier si l'article sélectionné est un nom ou un ID
      const selectedItem = props.article.find(item => item.article === selectedValue || item.id === parseInt(selectedValue));
    
      if (selectedItem) {
        const prixformater = formatPrice(selectedItem.prix);
        setInput(prev => ({
          ...prev,
          id: selectedItem.id,
          code: selectedItem.code,
          prix: prixformater,
        }));
        setPrix(selectedItem.prix);
      }
    };
    
    const formatPrice = (price) => {
      // Convertir le prix en nombre
      const numericPrice = parseFloat(price);
      // Formater le prix avec deux décimales et ajouter " DZD"
      return `${numericPrice.toFixed(2)} DZD`;
    };

  const HandelCodeInput=(e)=>{
    e.preventDefault();
    const name=e.target.name
    const value=e.target.value

    if(!isNaN(value)){
      setInput(item=>({...item,[name]:value}))
    }
  }


   function getCurrentDateTime() {
    const maintenant = new Date();
    const jour = maintenant.getDate().toString().padStart(2, '0');
    const mois = (maintenant.getMonth() + 1).toString().padStart(2, '0');
    const annee = maintenant.getFullYear();
    const heure = maintenant.getHours().toString().padStart(2, '0');
    const minutes = maintenant.getMinutes().toString().padStart(2, '0');
    const secondes = maintenant.getSeconds().toString().padStart(2, '0');
    return `${jour}/${mois}/${annee} ${heure}:${minutes}:${secondes}`;
  }

const handelModifOpen=()=>{
  setModifierBon(true);
  setListeBon(false)
}
const handelModifClose=()=>{
  setModifierBon(false);
  setListeBon(true)
}
  const handelAjoutOpen=()=>{
    setAjouterBon(true);
    setListeBon(false);
  } 
  const handelAjoutClose=()=>{
    setAjouterBon(false);
    setListeBon(true);
  }

  const ChangePrix= (e)=>{
    e.preventDefault();
    PrixRef.current.focus();
  }

  const HandelShowCalculatrice=(e)=>{
    e.preventDefault();
    setShowCalculatrice(true);
  }
  
  return (
    <div>
   <div className="nav-comp flex flex-row justify-center gap-20  w-full ml-3">
    <div className="flex flex-col justify-center items-center bg-gray-400 p-3 w-96 h-24" style={{width:'30%'}}>
        <h3 style={{ color: "red" }} className='font-bold text-xl'>CREDIT CLIENT</h3>
        <div className="flex flex-row justify-center items-center gap-1">
            <h5 className='flex flex-row justify-center items-center gap-1'><FaUser /> Clients :</h5>
            <select className="w-32 border-none h-6" value={client} onChange={onClientSelect}/>
        </div>
    </div>
    <div className="flex  flex-row justify-center items-center gap-2 "style={{width:'65%'}} >
        <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300" onClick={() => setInfoArticle(true)} >F2 prix?</button>
        <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300">F5 OK</button>
        <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300" onClick={() => setListeBon(true)} >F4 Liste</button>
        <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300">SUI</button>
        <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300">Pre</button>
        <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center flex-col justify-center bg-gray-300">F1 <FaSearch style={{ color: 'gray'}}/></button>
        <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300">con F10</button>
        <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300" onClick={(e)=>ChangePrix(e)} >Prix F8</button>
        <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300">F11</button>
        <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300"><FaPlus style={{ color: 'green' }} /></button>
        <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300"><FaMinus style={{ color: 'red' }} /></button>
        <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300" style={{ color: 'green', fontSize: '20px' }}>*</button>
        <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex flex-col items-center justify-center bg-gray-300" style={{ color: 'blue', fontSize: '15px' }} onClick={(e)=>HandelShowCalculatrice(e)}><FaCalculator style={{color:'blue'}}/>Calc</button>
      
    </div>
   
    <div className="text-2xl bg-green-500 flex flex-row justify-center items-center w-96 mr-3" style={{width:'30%'}}>
        <h2>{dateEtHeureActuelles}</h2>
    </div>
    
    
</div>
    </div>
  )
}
