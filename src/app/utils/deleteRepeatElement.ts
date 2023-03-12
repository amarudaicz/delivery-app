  
  export const deleteRepeatElement = (array:any[]) => {
    for (let i = 0; i < array.length; i++) {
      const objeto1 = JSON.stringify(array[i]);
      for (let j = i + 1; j < array.length; j++) {
        const objeto2 = JSON.stringify(array[j]);
        if (objeto1 === objeto2) {
          array.splice(j, 1);
          j--; // para compensar la eliminación del elemento en la posición actual
        }
      }
    }
    return array;
  }