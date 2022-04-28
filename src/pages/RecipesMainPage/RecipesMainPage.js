import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../Context/DataContext';
import Header from '../../components/Header';
import Button from '../../components/Button';
import RecipesList from '../../components/RecipesMainPage/RecipesList';
import Footer from '../../components/Footer/Footer';
import './RecipesMainPage.css';
import useFetch from '../../hooks/useFetch';

function RecipesMainPage() {
  const { pathname } = useLocation();
  const { recipesData, setRecipesData, selIngredient } = useData();
  const [categories, setCategories] = useState([]);
  const [selCategory, setSelCategory] = useState('All');
  let database = 'themealdb';
  let databaseKey = 'meals';
  let recipeKey = 'Meal';

  switch (pathname) {
  case '/comidas':
    database = 'themealdb';
    databaseKey = 'meals';
    recipeKey = 'Meal';
    break;
  case '/bebidas':
    database = 'thecocktaildb';
    databaseKey = 'drinks';
    recipeKey = 'Drink';
    break;
  default:
    console.log('Failed to set database!');
  }
  let URL = `https://www.${database}.com/api/json/v1/1/search.php?s=`;
  if (selCategory !== 'All') URL = `https://www.${database}.com/api/json/v1/1/filter.php?c=${selCategory}`;
  const URLCat = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const [results, loading] = useFetch(URL);
  const [cat, catLoading] = useFetch(URLCat);

  useEffect(() => {
    const getRecipes = () => {
      const max = 12;
      if (results[databaseKey].length > max) results[databaseKey].length = max;
      setRecipesData(results[databaseKey]);
    };
    const getCategories = () => {
      const max = 5;
      cat[databaseKey].length = max;
      setCategories(cat[databaseKey]);
      if (recipesData.length > 0) console.log(recipesData);
    };
    if (!loading) getRecipes();
    if (!catLoading) getCategories();
  }, [loading, databaseKey, results, setRecipesData, recipesData, cat, catLoading]);

  const handleCategoryClick = (category) => {
    if (category === selCategory) setSelCategory('All');
    else setSelCategory(category);
  };

  const renderCategoryButtons = () => (
    <>
      { selCategory !== 'All' && (<Button
        testId="All-category-filter"
        name="All"
        disabled={ false }
        onClick={ () => handleCategoryClick('All') }
      />) }
      { categories.map(({ strCategory }, index) => (
        <Button
          key={ index }
          testId={ `${strCategory}-category-filter` }
          name={ strCategory }
          disabled={ false }
          onClick={ () => handleCategoryClick(strCategory) }
        />
      ))}
    </>);
  return (
    <div className="main-container">
      <Header title={ pathname === '/comidas' ? 'Comidas' : 'Bebidas' } />
      {
        catLoading
          ? <h6>loading...</h6>
          : (
            <nav className="nav-container">
              { selIngredient !== '' ? null : renderCategoryButtons() }
            </nav>
          )
      }
      {
        loading
          ? <h3>loading...</h3>
          : (
            <RecipesList
              recipesData={ recipesData }
              recipeKey={ recipeKey }
            />
          )
      }
      <Footer />
    </div>
  );
}

export default RecipesMainPage;
