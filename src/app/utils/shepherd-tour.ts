import Shepherd from "shepherd.js";

export const shepherd = new Shepherd.Tour({

    useModalOverlay: true,
    
    defaultStepOptions: {
      
      scrollTo:{behavior:'smooth', block:'center'},
      classes: 'custom-tour',
    },
})

shepherd.on('complete', () => {
  console.log('COMPLETOOOO');
  localStorage.setItem('watched-tutorial', 'true')
  
})