import React from 'react';
import { objectOf } from 'prop-types';

export default function Ingredients(props) {
  const max = 20;
  const ingredients = [];
  for (let index = 1; index <= max; index += 1) {
    if (props.data[`strIngredient${index}`]) {
      ingredients.push(`${props.data[`strIngredient${index}`]}
        - ${props.data[`strMeasure${index}`]}`);
    }
  }
  return (
    <div>
      <h5 style={ { margin: '15px 0 5px' } }>Ingredients</h5>
      <ul className="list-ingredient-details">
        {
          ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }
            </li>
          ))
        }
      </ul>
    </div>
  );
}

Ingredients.propTypes = {
  data: objectOf.isRequired,
};
