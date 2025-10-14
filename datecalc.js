//start_date.value = new Date(); // ne fonctionne pas pck il faut un format anglais

const today = new Date().toISOString().split("T")[0];

start_date.value = today;
start_date.min = today;

//calcul de la date de demain

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// convertir le format de l'input
let tomorrowFormat = tomorrow.toISOString().split("T")[0];

end_date.value = tomorrowFormat;
end_date.min = tomorrowFormat;

start_date.addEventListener("change", (e) => {
  let day = new Date(e.target.value);

  if (end_date.value < start_date.value) {
    day.setDate(day.getDate() + 1);
    end_date.value = day.toISOString().split("T")[0];
  }
});

end_date.addEventListener("change", (e) => {
  let day = new Date(e.target.value);

  if (end_date.value < start_date.value) {
    day.setDate(day.getDate() - 1);
    start_date.value = day.toISOString().split("T")[0];
  }
}); // cette étape permet de modifier la startDate  si on modifie la endDate. Pour être sur que la endDate ne soit pas antérieure à la startDate.

const bookingCalc = () => {
  let diffTime = Math.abs(
    new Date(end_date.value) - new Date(start_date.value)
  );

  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // ceil permet d'arrondir au suppérieur contrairement au floor / le calcul permet de trouver l'écart en jour.

  total.textContent = diffDays * nightPrice.textContent;
};

bookingCalc();

start_date.addEventListener("change", bookingCalc);
end_date.addEventListener("change", bookingCalc);
