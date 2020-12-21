import React from 'react';
import { Form } from 'react-bootstrap';

class Selecccion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.updateValue = this.updateValue.bind(this);
    }


    


   

   updateValue= (e) =>{
       
        this.setState({
            value: e.target.value
          });
          console.log("ingreso al hijo");
          console.log(e.target.value);

          //const{ handlepadre }  = this.props;
          //handlepadre(e.target.value);

          this.props.callback(e.target.value);

     }
   


    render() {
      
        var opciones = this.props.group;
        const { value } = this.state;
      
      
        return (
            <div>
                <div className="row">



                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Filtro por Estado</Form.Label>
                        <Form.Control as="select" value={value} onChange={this.updateValue}>

                            {opciones.map(opcs =>
                                <option key={opcs} value={opcs}>{opcs}</option>
                            )};


                        </Form.Control>
                    </Form.Group>

                </div>
                <div className="row">

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Filtro por Sector</Form.Label>
                        <Form.Control as="select">
                            <option>Seleccione el Sector</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>

                </div>
                <div className="row">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Filtro por Año</Form.Label>
                        <Form.Control as="select">
                            <option>Seleccione el año</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>



                </div>
            </div>
        )
    }
}

export default Selecccion;