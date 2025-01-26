document.getElementById('btn').addEventListener('click', () => {
    alert('¡Hola desde JavaScript!');
  });


  // -------------------DE ACA
  //I3

  // el DOMContentLoaded hace que se cree todo el codigo primero y luego ejecute eso, sino
  // puede que se ejectue esto sin antes crear la etiqueta con el id = i3
  document.addEventListener('DOMContentLoaded', () => {
    const formI3 = document.getElementById('i3');
    const familyProcessorSelect = document.getElementById('Family_Processor');

    if (formI3) {
        formI3.style.display = 'none';
    } else {
        console.error('Elemento con ID "i3" no encontrado.');
    }
    //Como hablamos de una lista, no funciona el click, sino el change
    if (familyProcessorSelect) {
        familyProcessorSelect.addEventListener('change', (event) => {
            const selectedValue = event.target.value;

            if (selectedValue === 'intel_i3') {
                formI3.style.display = ''; // Muestra el formulario
            } else if (formI3) {
                formI3.style.display = 'none'; // Oculta el formulario si se selecciona otra opción
            }
        });
    } else {
        console.error('Elemento con ID "Family_Processor" no encontrado.');
    }
});


//I5

document.addEventListener('DOMContentLoaded', () => {
  const formI3 = document.getElementById('i5');
  const familyProcessorSelect = document.getElementById('Family_Processor');

  if (formI3) {
      formI3.style.display = 'none';
  } else {
      console.error('Elemento con ID "i5" no encontrado.');
  }
  //Como hablamos de una lista, no funciona el click, sino el change
  if (familyProcessorSelect) {
      familyProcessorSelect.addEventListener('change', (event) => {
          const selectedValue = event.target.value;

          if (selectedValue === 'intel_i5') {
              formI3.style.display = ''; // Muestra el formulario
          } else if (formI3) {
              formI3.style.display = 'none'; // Oculta el formulario si se selecciona otra opción
          }
      });
  } else {
      console.error('Elemento con ID "Family_Processor" no encontrado.');
  }
});

//I7

document.addEventListener('DOMContentLoaded', () => {
  const formI3 = document.getElementById('i7');
  const familyProcessorSelect = document.getElementById('Family_Processor');

  if (formI3) {
      formI3.style.display = 'none';
  } else {
      console.error('Elemento con ID "i7" no encontrado.');
  }
  //Como hablamos de una lista, no funciona el click, sino el change
  if (familyProcessorSelect) {
      familyProcessorSelect.addEventListener('change', (event) => {
          const selectedValue = event.target.value;

          if (selectedValue === 'intel_i7') {
              formI3.style.display = ''; // Muestra el formulario
          } else if (formI3) {
              formI3.style.display = 'none'; // Oculta el formulario si se selecciona otra opción
          }
      });
  } else {
      console.error('Elemento con ID "Family_Processor" no encontrado.');
  }
});

//I9

document.addEventListener('DOMContentLoaded', () => {
  const formI3 = document.getElementById('i9');
  const familyProcessorSelect = document.getElementById('Family_Processor');

  if (formI3) {
      formI3.style.display = 'none';
  } else {
      console.error('Elemento con ID "i9" no encontrado.');
  }
  //Como hablamos de una lista, no funciona el click, sino el change
  if (familyProcessorSelect) {
      familyProcessorSelect.addEventListener('change', (event) => {
          const selectedValue = event.target.value;

          if (selectedValue === 'intel_i9') {
              formI3.style.display = ''; // Muestra el formulario
          } else if (formI3) {
              formI3.style.display = 'none'; // Oculta el formulario si se selecciona otra opción
          }
      });
  } else {
      console.error('Elemento con ID "Family_Processor" no encontrado.');
  }
});
 

//------------------- HASTA ACA DRY (DONT REPEAT YOURSELF)