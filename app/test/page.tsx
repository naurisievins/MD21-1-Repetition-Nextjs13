'use client'

import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function YourPage() {
  const [formData, setFormData] = useState([]);

  const handlePost = () => {
    axios.post('api/PostRecipe', {})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleGet = () => {
    axios.get('api/GetRecipes')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <button onClick={handlePost}>Post</button>

      <button onClick={handleGet}>Get</button>
    </>

  );
}


//   fetch('api/postRecipe', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ a: 1, b: 2 })
//   })
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//       // handle the response data here
//     })
//     .catch(error => console.error(error));
// };


