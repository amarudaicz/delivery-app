import Shepherd from "shepherd.js";

export const shepherdMain = new Shepherd.Tour({
    useModalOverlay: true,
    
    defaultStepOptions: {
      scrollTo:{behavior:'smooth', block:'center'},
      classes: 'custom-tour',
    },
    
})

export const shepherdListProducts = new Shepherd.Tour({
  useModalOverlay: true,
  
  defaultStepOptions: {
    scrollTo:{behavior:'smooth', block:'center'},
    classes: 'custom-tour',
  },
})

shepherdMain.on('complete', () => {
  localStorage.setItem('shepherd-main', 'true')
  document.body.style.overflow = 'inherit'
})

shepherdListProducts.on('complete', () => {
  localStorage.setItem('shepherd-list-products', 'true')
  document.body.style.overflow = 'inherit'
  
})