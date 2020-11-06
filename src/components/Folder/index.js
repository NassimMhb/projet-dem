import React, { useState, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab, Row, Col, Nav } from 'react-bootstrap'
import '../../pages.css';
import Stepper from 'react-stepper-horizontal';
import DatePicker, { registerLocale} from "react-datepicker";
import delivery from '../../delivery.svg'
import box from '../../box4.svg'
import PlacesAutocomplete, {
    geocodeByAddress
  } from 'react-places-autocomplete';
import "react-datepicker/dist/react-datepicker.css";
import fr from 'date-fns/locale/fr';



registerLocale('fr', fr);



function Folder() {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [etage, setEtage] = useState('');
    const [infosComp, setInfosComp] = useState('');

    const [formuleSelectionnee, setFormuleSelectionnee] = useState("formule1");
    const selectFormule = numero => {
        if(numero === 1)
            setFormuleSelectionnee("formule1")
        else if(numero === 2)
            setFormuleSelectionnee("formule2")
        else 
            setFormuleSelectionnee("formule3")
    }

    const searchOptions = {
        types: ['address'],
        componentRestrictions:{country:'FR'} 
      }
    const [address, setAdress] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [ville, setVille] = useState('');
    const [placeId, setPlaceId] = useState('');
    const [addressFirstPart, setAddressFirstPart] = useState('');
    const [disabledOne, setDisabledOne] = useState(false);

    const [addressArrivee, setAdressArrivee] = useState('');
    const [codePostalArrivee, setCodePostalArrivee] = useState('');
    const [villeArrivee, setVilleArrivee] = useState('');
    
    const handleInputChange = e =>{
        const target = e.target;
        const value = target.value;
        const name = target.name;

        if(name === 'nom')
            setNom(value);
        else if(name === 'prenom')
            setPrenom(value);
        else if(name === 'email')
            setEmail(value);
        else if(name === 'tel')
            setTel(value);
        else if(name === 'codePostal')
            setCodePostal(value);
        else if(name === 'ville')
            setVille(value);
        else if(name === 'etage')
            setEtage(value);
        else if(name === 'infos')
            setInfosComp(value);
    }

    const handleChange = address => {
        setAdress(address);
        setAddressFirstPart(address);
        setDisabledOne(false);
        setPlaceId('');
    };

    const updateDataLocation = (numeroRue, avenue, zipCode, nomVille, placeId) => {
        setAddressFirstPart(numeroRue+" "+ avenue)
        setCodePostal(zipCode)
        setVille(nomVille)
        setPlaceId(placeId);
        setDisabledOne(true);
    }
    
    const handleSelect = address => {
        console.log(address)
        geocodeByAddress(address)
            .then(results => updateDataLocation(results[0].address_components[0].long_name, results[0].address_components[1].long_name,results[0].address_components[6].short_name, results[0].address_components[2].short_name, results[0].place_id))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
            setAddressFirstPart(address);
    };

    const [step, setStep] = useState(0);
    const passStep = numb => {
        setStep(numb);
    }

    const [startDate, setStartDate] = useState(new Date());

    const handleChangeSt = date => {
      setStartDate(date);
     }
     const [endDate, setEndDate] = useState(new Date());

     const handleChangeEd = date => {
       setEndDate(date);
      }
    
    const [titleItemSelect, setTitleItemSelect] = useState('Salle à manger');
    const changeTitle = title => {
        setTitleItemSelect(title);
    }
   
  return (
    <div className="container-fluid bg-light padTop pb50">
        <h1 className="text-center title-section-one"><img src={delivery} alt="Camion de livraison" width="80px" height="30px" className="mb4" />MON DEVIS FACILE EN LIGNE</h1>
        <div className="container">
            <Stepper steps={ [{title: 'Renseignez vos informations'}, {title: 'Selectionnez vos mobiliers'}, {title: 'Envoyez votre devis'}] } activeStep={ step } activeColor={'#e30613'} />
            <div className="container-md bg-white row pd30 mt30" >
            {/* ----------------- ETAPE 1 - DEBUT ----------------- */}
            {step === 0 &&  
            <Fragment>
                <div className="col-12 text-left">
                    <h6 className="mgb">Informations générales</h6>
                    <div className="row">
                        <div className="col-3">
                        <input type="text" name="nom" className="form-control" placeholder="Nom *" aria-label="" aria-describedby="basic-addon1" value={nom} onChange={handleInputChange} />
                        </div>
                        <div className="col-3">
                        <input type="text" name="prenom" className="form-control" placeholder="Prénom *" aria-label="" aria-describedby="basic-addon1" value={prenom} onChange={handleInputChange} />
                        </div>
                        <div className="col-3">
                        <input type="text" name="email" className="form-control" placeholder="Adresse email *" aria-label="" aria-describedby="basic-addon1" value={email} onChange={handleInputChange} />
                        </div>
                        <div className="col-3">
                        <input type="text" pattern="[0-9]*" name="tel" className="form-control" placeholder="N° de téléphone *" aria-label="" aria-describedby="basic-addon1" value={tel} onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
                <div className="col-12 text-left">
                    <h6 className="mgbt">Date souhaitée</h6>
                    <div className="row">
                        <div className="col-12">
                            <div className="displayFlex">
                                <span className="mt7">Déménagement prévu entre le </span><DatePicker locale="fr" dateFormat="P" selected={startDate} onChange={handleChangeSt} minDate={new Date()}  className="form-control width120 mlr8"/><span className="mt7"> et le</span> <DatePicker locale="fr" dateFormat="P" selected={endDate} onChange={handleChangeEd} minDate={new Date()} className="form-control width120 mlr8" />
                            </div>
                        </div>
                    </div> 
                </div>
                <div className="col-6 text-left">
                    <h6 className="mgbt">Départ</h6>
                    <div className="row">
                        <div className="col-12">
                        {/* Google maps */}
                        <PlacesAutocomplete
                            value={address}
                            onChange={handleChange}
                            onSelect={handleSelect}
                            searchOptions={searchOptions}
                        >   
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                {...getInputProps({
                                    placeholder: 'Adresse *',
                                    className: 'location-search-input form-control',
                                    autocomplete:'none',
                                })} value={addressFirstPart}
                                />
                                <div className="autocomplete-dropdown-container pdl13">
                                {loading && <div>Chargement...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                    <div 
                                        {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                            )}
                        </PlacesAutocomplete>
                        {/* Fin Google maps */}


                        </div>
                        <div className="col-6 mt20">
                        <input type="text" name="codePostal" className="form-control" placeholder="Code postal *" aria-label="" aria-describedby="basic-addon1" value={codePostal} onChange={handleInputChange} disabled={disabledOne} />
                        </div>
                        <div className="col-6 mt20">
                        <input type="text" name="ville" className="form-control" placeholder="Ville *" aria-label="" aria-describedby="basic-addon1" value={ville} onChange={handleInputChange} disabled={disabledOne}/>
                        </div>
                        <div className="col-3 mt20">
                        <input type="number" name="etage" className="form-control" placeholder="Étage ? *" aria-label="" aria-describedby="basic-addon1" value={etage} onChange={handleInputChange}/>
                        </div>
                        <div className="col-3 mt20">
                            <label className="pt8 cursor-pointer"><input type="checkbox" value="" className="cursor-pointer"/> Ascenseur</label>
                        </div>
                    </div>
                </div>
                <div className="col-6 text-left">
                    <h6 className="mgbt">Arrivée</h6>
                    <div className="row">
                        <div className="col-12">
                        {/* Google maps */}
                        <PlacesAutocomplete
                            value={addressArrivee}
                            onChange={handleChange}
                            onSelect={handleSelect}
                            searchOptions={searchOptions}
                        >   
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                {...getInputProps({
                                    placeholder: 'Adresse *',
                                    className: 'location-search-input form-control',
                                    autocomplete:'none',
                                })} value={addressFirstPart}
                                />
                                <div className="autocomplete-dropdown-container pdl13">
                                {loading && <div>Chargement...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                    <div 
                                        {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                            )}
                        </PlacesAutocomplete>
                        {/* Fin Google maps */}


                        </div>
                        <div className="col-6 mt20">
                        <input type="text" className="form-control" placeholder="Code postal *" aria-label="" aria-describedby="basic-addon1" value={codePostalArrivee} onChange={handleInputChange} disabled={disabledOne}/>
                        </div>
                        <div className="col-6 mt20">
                        <input type="text" className="form-control" placeholder="Ville *" aria-label="" aria-describedby="basic-addon1" value={villeArrivee} onChange={handleInputChange} disabled={disabledOne}/>
                        </div>
                        <div className="col-3 mt20">
                        <input type="text" className="form-control" placeholder="Étage ? *" aria-label="" aria-describedby="basic-addon1" />
                        </div>
                        <div className="col-3 mt20">
                            <label className="pt8 cursor-pointer"><input type="checkbox" value="" className="cursor-pointer"/> Ascenseur </label>
                        </div>
                    </div>
                </div>
                <div className="col-12 text-left">
                    <h6 className="mgbt">Choix de la formule</h6>
                    <div className="row">
                        <div className="col-4 text-center">
                            <div className={"formule " + (formuleSelectionnee === "formule1"  ? "formuleSelect" : " ")} onClick={() => selectFormule(1)}>
                                <p className="m0">Formule Basic</p>
                            </div>
                        </div>
                        <div className="col-4 text-center">
                            <div className={"formule " + (formuleSelectionnee === "formule2"  ? "formuleSelect" : " ")} onClick={() => selectFormule(2)}>
                                <p className="m0">Formule Eco</p>
                            </div>
                        </div>
                        <div className="col-4 text-center">
                            <div className={"formule " + (formuleSelectionnee === "formule3"  ? "formuleSelect" : " ")} onClick={() => selectFormule(3)}>
                                <p className="m0">Formule Plus</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 text-left">
                    <h6 className="mgbt">Informations complémentaires</h6>
                    <div className="row">
                        <div className="col-12">
                            <textarea className="form-control mh120" name="infos" placeholder="Ici, vous pouvez entrez des informations complémentaires sur votre déménagement que vous souhaiterez communiquer aux déménageurs." value={infosComp} onChange={handleInputChange}>
                               
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="col-12 text-center mt30">
                    <p className="msgInfo">* Tous les champs sont obligatoires</p>
                </div>
                <div className="col-12 text-right mt30">
                    <button type="button" className="btn btn-danger" onClick={() => passStep(1)}>Etape suivante 1/3</button>
                </div>
                </Fragment>
            }
            {/* ----------------- ETAPE 1 - FIN ------------------- */}


            {/* ----------------- ETAPE 2 - Début ----------------- */}
            {step === 1 && 
                <Fragment>
                <div className="col-12 text-left">
                    <button type="button" className="btn btn-primary" onClick={() => passStep(0)}>Retour</button>
                    <h4 className="text-center titre-section-volume"><img src={box} alt="Camion de livraison" width="45px" height="30px" className="mb4" />Calculez votre volume</h4>
                </div>

                <Tab.Container id="left-tabs-example" defaultActiveKey="sam">
                    <Row  className="container pmt20">
                        <div className="col-9 row">
                            <div className="col-12">
                                <input type="text" className="form-control mb20 ft12" placeholder="Rechercher" aria-label="" aria-describedby="basic-addon1" />
                            </div>    
                        <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="sam"  onClick={() => changeTitle("Salle à manger")}>Salle à manger</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="cuisine"  onClick={() => changeTitle("Cuisine")}>Cuisine <span className="colorRed">(2)</span></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="sejour"  onClick={() => changeTitle("Séjour")}>Séjour</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="entree" onClick={() => changeTitle("Entrée")}>Entrée</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="sdb" onClick={() => changeTitle("Salle de bains")}>Salle de bains</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="toilettes" onClick={() => changeTitle("Toilettes")}>Toilettes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="blctr" onClick={() => changeTitle("Balcon / Terasse")}>Balcon / Terasse</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="salon" onClick={() => changeTitle("Salon")}>Salon</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="chb1" onClick={() => changeTitle("Chambre 1")}>Chambre 1</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="chb2" onClick={() => changeTitle("Chambre 2")}>Chambre 2</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="chb3" onClick={() => changeTitle("Chambre 3")}>Chambre 3</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="chb4" onClick={() => changeTitle("Chambre 4")}>Chambre 4</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="bureau" onClick={() => changeTitle("Bureau")}>Bureau</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="couloir" onClick={() => changeTitle("Couloir")}>Couloir</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="jardin" onClick={() => changeTitle("Jardin")}>Jardin</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="cave" onClick={() => changeTitle("Cave")}>Cave</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="grenier" onClick={() => changeTitle("Grenier")}>Grenier</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="garage"  onClick={() => changeTitle("Garage")}>Garage</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="autres"  onClick={() => changeTitle("Autres")}>Autres</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="autres"  onClick={() => changeTitle("Autres")}>Ajouter un objet +</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                            <p className="bg-grey pd8 ft12">Total {titleItemSelect} : <span className="colorRed">0.00m</span></p>
                        <Tab.Content>
                            <Tab.Pane eventKey="sam">
                                Salle à manger
                            </Tab.Pane>
                            <Tab.Pane eventKey="cuisine">
                                Cuisine
                            </Tab.Pane>
                            <Tab.Pane eventKey="sejour">
                                Séjour
                            </Tab.Pane>
                            <Tab.Pane eventKey="entree">
                                Entrée
                            </Tab.Pane>
                            <Tab.Pane eventKey="sdb">
                                Salle de bains
                            </Tab.Pane>
                            <Tab.Pane eventKey="toilettes">
                                Toilettes
                            </Tab.Pane>
                            <Tab.Pane eventKey="blctr">
                                Balcon Terasse
                            </Tab.Pane>
                            <Tab.Pane eventKey="salon">
                                Salon
                            </Tab.Pane>
                            <Tab.Pane eventKey="chb1">
                                Chambre 1
                            </Tab.Pane>
                            <Tab.Pane eventKey="chb2">
                                Chambre 2
                            </Tab.Pane>
                            <Tab.Pane eventKey="chb3">
                                Chambre 3
                            </Tab.Pane>
                            <Tab.Pane eventKey="chb4">
                                Chambre 4
                            </Tab.Pane>
                            <Tab.Pane eventKey="bureau">
                                bureau
                            </Tab.Pane>
                            <Tab.Pane eventKey="couloir">
                                couloir
                            </Tab.Pane>
                            <Tab.Pane eventKey="jardin">
                                jardin
                            </Tab.Pane>
                            <Tab.Pane eventKey="cave">
                                cave
                            </Tab.Pane>
                            <Tab.Pane eventKey="grenier">
                                grenier
                            </Tab.Pane>
                            <Tab.Pane eventKey="garage">
                                garage
                            </Tab.Pane>
                            <Tab.Pane eventKey="autres">
                                Retrouvez ici la liste des objets que vous avez ajouté.
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                        </div>
                        <div className="col-3">
                        </div>
                    </Row>
                </Tab.Container>

                <div className="col-12 text-right mt30">
                        <button type="button" className="btn btn-danger" onClick={() => passStep(2)}>Etape suivante 2/3</button>
                </div>
                </Fragment>
            }    
            {/* ----------------- ETAPE 2 - FIN ------------------- */}
            
            {/* ----------------- ETAPE 3 - Début ----------------- */}
            {step === 2 && 
                <Fragment>
                <div className="col-12 text-left">
                    <button type="button" className="btn btn-primary" onClick={() => passStep(1)}>Retour</button>
                </div>

                <div className="col-12 text-right mt30">
                        <button type="button" className="btn btn-danger">Etape suivante 3/3</button>
                </div>
                </Fragment>
            }    
            {/* ----------------- ETAPE 3 - FIN ------------------- */}

            </div>
        </div>
    </div>
  );
}

export default Folder;
