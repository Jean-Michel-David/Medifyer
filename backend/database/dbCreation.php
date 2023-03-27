<?php
$dbCreatingString = "CREATE TABLE Users(
    user_id INT AUTO_INCREMENT,
    nom_user VARCHAR(50),
    prenom_user VARCHAR(50),
    psw_user VARCHAR(255),
    pfp_user VARCHAR(10),
    admin_user BOOLEAN,
    email_user VARCHAR(50) NOT NULL,
    PRIMARY KEY(user_id)
    );
    
    CREATE TABLE Recherches(
    recherche_id INT AUTO_INCREMENT,
    question_rech LONGTEXT,
    population_rech VARCHAR(250),
    traitement_rech VARCHAR(250),
    resultat_rech VARCHAR(250),
    public_rech BOOLEAN,
    commentaire_rech LONGTEXT,
    lastUpdate TIMESTAMP,
    user_id INT NOT NULL,
    PRIMARY KEY(recherche_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
    );
    
    CREATE TABLE Termes(
    terme_id INT AUTO_INCREMENT,
    termesFrancaisPopulation VARCHAR(250),
    termesFrancaisResultat VARCHAR(250),
    termesFrancaisTraitement VARCHAR(250),
    termesMeshPopulation VARCHAR(250),
    termesMeshResultat VARCHAR(250),
    termesMeshTraitement VARCHAR(250),
    synonymesPopulation VARCHAR(250),
    synonymesResultat VARCHAR(250),
    synonymesTraitement VARCHAR(250),
    recherche_id INT NOT NULL,
    PRIMARY KEY(terme_id),
    UNIQUE KEY(recherche_id),
    FOREIGN KEY(recherche_id) REFERENCES Recherches(recherche_id)
    );
    
    CREATE TABLE Equation(
    equation_id INT AUTO_INCREMENT,
    relationsPopulation VARCHAR(250),
    relationsTraitement VARCHAR(250),
    relationsResultat VARCHAR(250),
    terme_id INT NOT NULL,
    PRIMARY KEY(equation_id),
    UNIQUE KEY(terme_id),
    FOREIGN KEY(terme_id) REFERENCES Termes(terme_id)
    );
    
    CREATE TABLE aAccesA(
    recherche_id INT,
    user_id INT,
    PRIMARY KEY(recherche_id, user_id),
    FOREIGN KEY(recherche_id) REFERENCES Recherches(recherche_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
    );

    CREATE TABLE Infos(
        Id_Info INT AUTO_INCREMENT,
        libelle_info VARCHAR(40),
        texte_info LONGTEXT,
        PRIMARY KEY(Id_Infobulles)
    );
    ";