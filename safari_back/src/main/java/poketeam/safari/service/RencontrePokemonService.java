package poketeam.safari.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poketeam.safari.dao.IDAORencontrePokemon;
import poketeam.safari.model.Joueur;
import poketeam.safari.model.PokemonCapture;
import poketeam.safari.model.RencontrePokemon;

@Service
public class RencontrePokemonService {

    @Autowired
    private IDAORencontrePokemon daoRencontrePokemon;

    @Autowired
    private PokemonCaptureService pokemonCaptureService;

    @Autowired
    private CompteService compteService;


    public RencontrePokemon getById(Integer id) {
        return daoRencontrePokemon.findById(id).orElse(null);
    }

    public RencontrePokemon createOrUpdate(RencontrePokemon rencontrePokemon) {
        return daoRencontrePokemon.save(rencontrePokemon);
    }

    public void deleteById(Integer id) {
        daoRencontrePokemon.deleteById(id);
    }
    
    public String lancerBoue(RencontrePokemon rencontrePokemon) {
        inventaireMaj(0,1,0, rencontrePokemon);
		int tauxCaptureModtemp = rencontrePokemon.getTauxCaptureMod();
		int tauxFuiteModtemp = rencontrePokemon.getTauxFuiteMod();
		if(Math.random() < 0.9) {
			tauxCaptureModtemp+=1;
			tauxFuiteModtemp+=1;
		} else {
			tauxCaptureModtemp+=1;
		}

		if(tauxCaptureModtemp > 6) {
			tauxCaptureModtemp = 6;
		}

		if(tauxFuiteModtemp > 6) {
			tauxFuiteModtemp = 6;
		}

		rencontrePokemon.setTauxCaptureMod(tauxCaptureModtemp);
		rencontrePokemon.setTauxFuiteMod(tauxFuiteModtemp);
		return aFuit(rencontrePokemon);
	}

    public String donnerAppat(RencontrePokemon rencontrePokemon) {
        inventaireMaj(0,0,1, rencontrePokemon);
		int tauxCaptureModtemp = rencontrePokemon.getTauxCaptureMod();
		int tauxFuiteModtemp = rencontrePokemon.getTauxFuiteMod();
		if(Math.random() < 0.9) {
			tauxCaptureModtemp-=1;
			tauxFuiteModtemp-=1;
		} else {
			tauxCaptureModtemp-=1;
		}

		if(tauxCaptureModtemp < -6) {
			tauxCaptureModtemp = 6;
		}

		if(tauxFuiteModtemp < -6) {
			tauxFuiteModtemp = 6;
		}

		rencontrePokemon.setTauxCaptureMod(tauxCaptureModtemp);
		rencontrePokemon.setTauxFuiteMod(tauxFuiteModtemp);
		return aFuit(rencontrePokemon);
	}

    //En travaux 
	public String lancerPokeball(RencontrePokemon rencontrePokemon) {
        inventaireMaj(1,0,0, rencontrePokemon);
		boolean capture = true;
		double safBall = 1.5;
		double tauxCaptureTemp = rencontrePokemon.getPokemon().getTauxCapture();
		int ballShackCpt = 0;
		double mult;
		int ballShakeProba;
		
		// Calcul tauxCapture temporaire: 
		if(rencontrePokemon.getTauxCaptureMod() > 0) {
			mult = (1 + 0.5 * rencontrePokemon.getTauxCaptureMod());
		}else {
			mult = (1 / (1 - 0.5 * rencontrePokemon.getTauxCaptureMod()));
		}
		
		tauxCaptureTemp = tauxCaptureTemp * mult;

		//Calcul du taux de capture final pour le calcul
		int tauxCapture255 = (int) Math.floor((tauxCaptureTemp * safBall)/3);

		if (tauxCapture255 < 1) {
			tauxCapture255 = 1;
		}
		//Calcul du taux de reussite des remuements de la pokéball
		ballShakeProba = (int) (65535.0 * Math.pow(((double) tauxCapture255 /255), (double) 1/4));
		//Check à effectuer pour les 4 fois lorsque la pokéball remue
		while(ballShackCpt < 4) {
			if(ballShakeProba > Math.random()*65535) {
				ballShackCpt++;
			}else {
				ballShackCpt = 4;
				capture = false;
			}
		}
		
		if(capture) {
			rencontrePokemon.setEstCapture(true);
            return finDeRencontreCapture(rencontrePokemon);
		}
		return aFuit(rencontrePokemon);
	}

    //En travaux 
	private String aFuit(RencontrePokemon rencontrePokemon){
		double tauxFuiteTemp = rencontrePokemon.getPokemon().getTauxFuite();
		
		double mult;
		
		if(rencontrePokemon.getTauxFuiteMod() > 0) {
			mult = (1 + 0.5 * rencontrePokemon.getTauxFuiteMod() );
		}else {
			mult = (1 / (1 - 0.5 * rencontrePokemon.getTauxFuiteMod()));
		}
		
		tauxFuiteTemp = tauxFuiteTemp * mult;
		
		if(tauxFuiteTemp > Math.random()*255) {
			rencontrePokemon.setaFuit(true);
            return finDeRencontreFuite(rencontrePokemon);
		}
        return tourSuivant(rencontrePokemon);
	}


    private String finDeRencontreCapture(RencontrePokemon rencontrePokemon) {
        Joueur joueur = (Joueur) compteService.getById(rencontrePokemon.getIdJoueur());
        pokemonCaptureService.create(new PokemonCapture(joueur, rencontrePokemon.getPokemon()));
        deleteById(rencontrePokemon.getId());
        return "capture";
    }

    private String finDeRencontreFuite(RencontrePokemon rencontrePokemon) {
        deleteById(rencontrePokemon.getId());
        return "fuite";
    }

    private String tourSuivant(RencontrePokemon rencontrePokemon) {
        createOrUpdate(rencontrePokemon);
        return "continue";
    }

    private void inventaireMaj(int nbPokeball, int nbBoue, int nbFriandise, RencontrePokemon rencontrePokemon){
        Joueur joueur = (Joueur) compteService.getById(rencontrePokemon.getIdJoueur());
        joueur.getInventaire().setNbPokeball(joueur.getInventaire().getNbPokeball() - nbPokeball);
        joueur.getInventaire().setNbBoue(joueur.getInventaire().getNbBoue() - nbBoue);
        joueur.getInventaire().setNbFriandise(joueur.getInventaire().getNbFriandise() - nbFriandise);
        compteService.updateWithEncryptedPassword(joueur);
    }
}
