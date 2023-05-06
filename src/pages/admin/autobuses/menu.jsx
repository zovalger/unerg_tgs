import React, { useState } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import style from "../../../styles/Bus/menu.module.css"

const MenuBus = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Término de búsqueda:', searchTerm);
  };

  return (
    <div className={style.container}>
    <div className={style.search}>
        <Form inline onSubmit={handleSubmit}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <div className="input-group">
          <Input
            type="text"
            name="searchTerm"
            id="searchTerm"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <div className="input-group-append">
            <Button type="submit" color="primary">
              <FaSearch />
            </Button>
          </div>
        </div>
      </FormGroup>
    </Form>
    </div>
    </div>
  );
};

export default MenuBus;