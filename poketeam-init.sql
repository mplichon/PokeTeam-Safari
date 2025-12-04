

USE poketeam_dc;

CREATE TABLE IF NOT EXISTS compte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_compte ENUM('admin','joueur') NOT NULL,
    login VARCHAR(20) NOT NULL,
    password VARCHAR(150) NOT NULL,
    nb_boue INT DEFAULT 0,
    nb_friandise INT DEFAULT 0,
    nb_pokeball INT DEFAULT 0,
    surnom VARCHAR(20),
    id_map INT
);

INSERT INTO compte (type_compte, login, password, nb_boue, nb_friandise, nb_pokeball, surnom, id_map)
VALUES ('joueur', 'triffou', 'adminpass', 5, 3, 10, 'Triffou', 1);
