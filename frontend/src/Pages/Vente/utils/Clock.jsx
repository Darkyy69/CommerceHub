import React, { useEffect, useState } from "react";

const Clock = () => {
  const [dateEtHeureActuelles, setDateEtHeureActuelles] =
    useState(getCurrentDateTime());
  const [date, time] = dateEtHeureActuelles.split(" ");
  useEffect(() => {
    // Mettre à jour la date toutes les secondes
    const interval = setInterval(() => {
      setDateEtHeureActuelles(getCurrentDateTime());
    }, 1000);
    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  function getCurrentDateTime() {
    const maintenant = new Date();
    const jour = maintenant.getDate().toString().padStart(2, "0");
    const mois = (maintenant.getMonth() + 1).toString().padStart(2, "0");
    const annee = maintenant.getFullYear();
    const heure = maintenant.getHours().toString().padStart(2, "0");
    const minutes = maintenant.getMinutes().toString().padStart(2, "0");
    const secondes = maintenant.getSeconds().toString().padStart(2, "0");
    return `${jour}/${mois}/${annee} ${heure}:${minutes}:${secondes}`;
  }

  return (
    <h2 className="text-center">
      {date}
      <br />
      {time}
    </h2>
  );
};

export default Clock;
