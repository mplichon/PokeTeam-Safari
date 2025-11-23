package poketeam.safari.model;

public class RencontrePokemon {

	Pokemon pokemon;
	int tauxFuiteMod;
	int tauxCaptureMod;
	boolean aFuit;
	boolean estCapture;

	public RencontrePokemon(Pokemon pokemon) {
		this.pokemon = pokemon;
		tauxFuiteMod = 0;
		tauxCaptureMod = 0;
		this.aFuit = false;
		this.estCapture = false;
	}

	public Pokemon getPokemon() {
		return pokemon;
	}

	public void setPokemon(Pokemon pokemon) {
		this.pokemon = pokemon;
	}

	public void lancerBoue() {
		int tauxCaptureModtemp = tauxCaptureMod;
		int tauxFuiteModtemp = tauxCaptureMod;
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

		tauxCaptureMod = tauxCaptureModtemp;
		tauxFuiteMod = tauxFuiteModtemp;
		aFuit();
	}

	public void donnerAppat() {
		int tauxCaptureModtemp = tauxCaptureMod;
		int tauxFuiteModtemp = tauxCaptureMod;
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

		tauxCaptureMod = tauxCaptureModtemp;
		tauxFuiteMod = tauxFuiteModtemp;
		aFuit();
	}

	//En travaux 
	public void lancerpokeball(){
		boolean capture = true;
		double safBall = 1.5;
		double tauxCaptureTemp = pokemon.getTauxCapture();
		int ballShackCpt = 0;
		double mult;
		
		// Calcul tauxCapture temporaire: 
		if(tauxCaptureMod > 0) {
			mult = (1 + 0.5 * tauxCaptureMod);
		}else {
			mult = (1 / (1 - 0.5 * tauxCaptureMod));
		}
		
		tauxCaptureTemp = tauxCaptureTemp * mult;

		
		
		
		//Calcul du taux de capture final pour le calcul
		int tauxCapture255 = (int) Math.floor((tauxCaptureTemp * safBall)/3);

		if (tauxCapture255 < 1) {
			tauxCapture255 = 1;
		}
		//Check à effectuer pour les 4 fois lorsque la pokéball remue
		while(ballShackCpt < 4) {
			int ballShakeProba = (int) (65535 * Math.pow(tauxCapture255/255, 1/4));
			if(ballShakeProba > Math.random()*65535) {
				ballShackCpt++;
			}else {
				ballShackCpt = 4;
				capture = false;
			}
		}
		
		if(capture) {
			estCapture = true;
		} else {
			aFuit();
		}
	}


	//En travaux 
	private void aFuit(){
		double tauxFuiteTemp = pokemon.getTauxFuite();
		
		double mult;
		
		if(tauxCaptureMod > 0) {
			mult = (1 + 0.5 * tauxFuiteMod);
		}else {
			mult = (1 / (1 - 0.5 * tauxFuiteMod));
		}
		
		tauxFuiteTemp = tauxFuiteTemp * mult;
		
		if(tauxFuiteTemp > Math.random()*255) {
			aFuit = true;
		}
	}


}
