import React,{useState,useEffect,useRef} from 'react'
import { FaCheck, FaPen, FaPlus, FaMinus,FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useData } from './DataProvider';
import Calculatrice from './Calculatrice';

export default function ComptoireBody() {

    const cbRef = useRef(null);
   const qteRef = useRef(null);
   const [input,setInput]=useState({qte:1});
   const [ajouter,setAjouter]=useState(false);
   const [showModal, setShowModal] = useState(true);
   const handleClose = () => {setShowModal(false); setAjouter(false);  }
   const [nvInputs,setNvInput]=useState({}); 
   const [article, setArticl] = useState([]);
   const [selectedArticle, setSelectedArticle] = useState(null);
   const [fontSize, setFontSize] = useState(80);
   const resultRef = useRef(null);
   const {PrixRef}=useData()
   const {ShowCalculatrice} = useData();
   const {InfoArticle,setInfoArticle}=useData()

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/comptoire/entite-marchandise/article/')
          .then(res => {
            setArticl(res.data);
          })
          .catch(err => {
            console.error('Error fetching data:', err);
          });
         
      }, []);
      
      
  
      
      
      
      
      // verfier lexistance de code bare entre 
      const VerifierCodeBare = (codebare) => {
        // Utiliser find() pour rechercher un élément avec le code-barres donné
        return article.find(item => item.barrcode === codebare) !== undefined;
      }
          
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          if (input.cb.length === 13) {
            // Appeler VerifierCodeBare avec le code-barres actuel
            if (VerifierCodeBare(input.cb)) {
              // Le code-barres existe, focus sur le champ de quantité
              qteRef.current.focus();
            } else {
              // Le code-barres n'existe pas, setAjouter(true) pour ouvrir la fenêtre d'ajout d'un article
              setAjouter(true);
            }
          }
        } else {
          // Réinitialiser l'état ajouter à true si un code-barres incorrect est entré
          setAjouter(false);
        }
      };
      
      
      const handleKeyPressQte = (event) => {
        if (event.key === 'Enter') {
          const selectedItem=article.find(item=>item.barrcode===input.cb);
          if(selectedItem){
            
            setInput(prev=>({
              ...prev,
              id: selectedItem.id,
              prix: selectedItem.P_vente,
              
            }))
            
            setInfo(prev => [
              ...prev,
              {
                article: selectedItem.codif,
                qte: input.qte,
                prix: selectedItem.P_vente,
              }
            ]);
            setInput({qte:1,cb:0})//initialisation
            
          }
        } 
      };
           
       
      //stocker les informations des input filed (code bare article id .....)
           const HandelInput = (e) => {
            const name = e.target.name;
            let value = e.target.value;
            
            // Vérifier si la valeur est numérique
            if (!isNaN(value)) {
              // Limiter la longueur à 13 chiffres pour le champ 'cb'
              if (name === 'cb' && value.length > 13) {
                return;
              }
              
              setInput(val => ({ ...val, [name]: value }));
            } else {
              setInput(val => ({ ...val, [name]: '' }));
            }
          };
      
      
          
      
      //la fonction pour selecionner un artilce sont id et famille automatiquemet s'affiche    
      const HandelArticl = (e) => {
        e.preventDefault();
        const selectedItem = article.find(item => item.codif === e.target.value);
        if (selectedItem) {
           setSelectedArticle(selectedItem); // Mettre à jour l'article sélectionné
      
           setInput(prev => ({
              ...prev,
              id: selectedItem.id,
              prix: selectedItem.P_vente,
           }));
      
           setInfo(prev => [
              ...prev,
              {
                 article: selectedItem.codif,
                 qte: input.qte,
                 prix: selectedItem.P_vente,
              }
           ]);
        }
      };
      
      
      
      
           const HandelNvInput = (e) => {
            const name = e.target.name;
            let value = e.target.value;
            setNvInput(val => ({ ...val, [name]: value }));
           
          }
           
        
          const HandelAjouterElement = (e) => {
            e.preventDefault();
            const nouvelArticle = {
              codif: nvInputs.article,
              barrcode: input.cb,
              qte:input.qte,
              P_vente: parseFloat(nvInputs.prix),
              id: 1, // Remplacer 1 par l'ID approprié de l'article
              id_S_article: 1, // Remplacer 1 par l'ID approprié de la sous-catégorie de l'article
              id_S_famille: 1, // Remplacer 1 par l'ID approprié de la famille de l'article
              fournisseur_best: 2, // Remplacer 2 par l'ID approprié du fournisseur
            };
            
            // Mise à jour de l'état 'article' en ajoutant le nouvel article à la liste existante
            setArticl(prevArticles => [...prevArticles, nouvelArticle]);
            alert('article ajouter !!!!')
            // Réinitialiser les champs d'entrée
            setInput({qte:1,cb:0});
            setNvInput({});
            setAjouter(false);
          };



          const FenetreInfoArticle = InfoArticle && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 border border-red-600 w-1/3 h-72 bg-gray-300 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <h1 className='text-xl font-bold'>Information Article</h1>
                <button className="text-gray-500" onClick={() => setInfoArticle(false)}>
                  <FaTimes className='hover:text-red-500'/>
                </button>
              </div>
          
              <div className='flex flex-col justify-start items-start gap-2'>
                <div className='flex flex-row justify-start items-center gap-1'>
                  <label htmlFor="">Famille:</label>
                  <select name="Famille" id="" className='border border-gray-300 h-8 w-56 '></select>
                </div>
          
                <div className='flex flex-row justify-start items-center gap-1'>
                  <label htmlFor="">Article:</label>
                  <select name="Article" id="" className='border border-gray-300 h-8 w-56 ml-1 '></select>
                </div>
          
                <div className='flex flex-row justify-start items-center gap-1'>
                  <label htmlFor="">CodeBarre:</label>
                  <input name="CodeBqrre" id="" className='border border-gray-300 h-8 ml-1 '></input>
                </div>
                <div className='flex flex-row justify-center items-center gap-2'>
                  <div className='flex flex-row justify-start items-center gap-1'>
                    <label htmlFor="">Prix:</label>
                    <input name="Prix" id="" className='border border-gray-300 h-8 ml-14'></input>
                  </div>
                  <div className='flex flex-row justify-start items-center gap-1'>
                    <label htmlFor="">Id:</label>
                    <input name="Id" id="" className='border border-gray-400 h-8 w-10'></input>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center mt-5'>
                <h1 className='text-2xl font-bold text-green-500'>129.00DZD</h1>
              </div>
            </div>
          );

          const fenetreCalculatrice=ShowCalculatrice&& <Calculatrice/>;
          



  return (
    
         <div className="flex flex-row justify-between items-center  h-56  ml-3" >
               <div className="flex flex-col  h-full items-start justify-center gap-5  bg-blue-500 p-3">
                  <div className="flex flex-row gap-2 justify-center items-center">
                    <div className="flex flex-row justify-center items-center gap-1 ml-6">
                   <p className='text-lg font-bold'>Code:</p>
                   <input className="w-96 h-12 text-center text-xl font-bold" type='text' ref={cbRef} name='cb' onKeyPress={handleKeyPress} value={input.cb} defaultValue={0} onChange={HandelInput}/>
                   </div>
                   <div className="flex flex-row justify-center items-center gap-1">
                   <p className='text-lg font-bold mr-1 '>Qte:</p>
                   <input className="h-12 w-20 text-center font-bold" ref={qteRef} name='qte' onChange={HandelInput} onKeyPress={handleKeyPressQte} value={input.qte} defaultValue={1}/>
                   </div>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-3">
                   <p className='text-lg font-bold'>Famille:</p>
                   <select className="w-56 h-8">   

                {article.map((item,index)=>{
                      <option key={index}>{item.id_S_famille}</option>
               })} 

               </select>

               <div className="flex flex-row justify-center items-center">
                <p className='text-lg font-bold mr-6'>ID:</p>
                 <select className="h-8 w-32" onChange={HandelInput} value={input.id}>  


                  {article.map((item,index)=>(
                    <option key={index}>{item.id}</option>
                  ))}

               </select>
               </div>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-2">
                  <p style={{marginRight:"1px",marginTop:'6px'}} className='text-lg font-bold'>Article:</p>
                  <select className="w-56 h-8" onChange={HandelArticl}>   
                  {article.map((item,index)=>(
                    <option key={index}>{item.codif}</option>
                  ))}

  

               </select>
               <p style={{marginTop:'6px'}} className='text-lg font-bold'>Prix:</p>
               <input className="w-1/3 h-8 text-center" ref={PrixRef} name='prix' onChange={HandelInput} value={selectedArticle ? selectedArticle.P_vente : input.prix}/>
                  </div>
               </div>
               
              
              <div  style={{ overflow: 'hidden', position: 'relative',width: '60%' }} className=' w-1/2 h-full text-right bg-black mr-3'>
  <div style={{ position: 'absolute', top: 0, left: 0 }}>
    {/* {history.map((equation, index) => (
      <div key={index}>{equation}</div>
    ))} */}
  </div>
  <div ref={resultRef} style={{ fontSize: `${fontSize}px` }} className='mt-10 text-green-500'>
  0.00
  </div>
</div>

{FenetreInfoArticle}
{fenetreCalculatrice}


    </div>
  )
}
