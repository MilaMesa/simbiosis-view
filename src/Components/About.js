import React from 'react';
import  './index.css';

const About = () => (
    
    <div className='container'>
      
        <h1 className='text-center'>Bienvenido a Simbiosis Textil</h1>
        <p className='text-center'>
            Simbiosis es una app creada para fortalezer la comuicacion en el mundo textil entre proveedores y talleres textiles.
        </p>
        < img style ={{height:200}} src ="imagenesV/HILOS.JPG" ></img>    
        < img style ={{height:200}} src ="imagenesV/TELAS.JPG" ></img> 
        < img style ={{height:200}} src ="imagenesV/TELAS1.JPG" ></img> <br />

       
        <table>
                    <br /> 
                <tr>
                    <td>< img style ={{height:188}} src ="imagenesV/PROVEEDOR.JPG" ></img> </td>
                    
                    
                    <td> <br /> <h4>Proveedor. </h4>
                           <br />Tienen la función básica de proporcionar materias primas, 
                            a la empresa con la que contrata. 
                            Su papel intermediador les confiere un potencial protagonismo,
                            pues tienen muchas formas  eficaces 
                            de ejercer presión sobre sus clientes
                            para conseguir que se acepten sus condiciones.<br />
                    </td> 
                        
                         
                 
                </tr>
                <br />
                <tr>
                    <td>< img style ={{height:200}} src ="imagenesV/TALLER.JPG" ></img>   </td>
                    
                    <td>  <h4>Taller. </h4>    
                       Tiene la función de adquirir  los insumos o productos del proveedor con el fin de poder relizar sus produtos.<br />
                    </td> 
                </tr>
                <br />
                
     </table> 
     
     <center> 
     <hr width="5000" ></hr>   
     <p> Siguenos en nuestras redes sociales</p>
     < img style ={{height:50}} src ="imagenesV/facebook.png" ></img> 
     < img style ={{height:50}} src ="imagenesV/twitter.png" ></img> 
     < img style ={{height:50}} src ="imagenesV/instagramx.png" ></img> 
     <p> SimbiosisTextil, todos los derechos reservados 2020 | Términos y condiciones legales.</p> 
     </center>
    
         
    </div>

    

);

export default About;