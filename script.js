document.getElementById("searchSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("searchInput").value;
  //const s = document.getElementById('selector');
  const s = "spells"; // The API can do more than spells
  if (value === "")
    return;
  // Fetch the spell info
  const url = "http://www.dnd5eapi.co/api/" + s + "/" + value;
  fetch(url)
    .then(function(response) {
      console.log(response);
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      results += '<h1>- ' + json.name + ' -</h1>';
      // Spell description
      // School
      results += '<h3>School of Magic: <em>' + json.school.name + '</em></h3>';
      // Spell level
      results += '<h3>Spell Level: <em>'
      if(json.level == 0)
        results += 'Cantrip</em></h3>';
      else
        results += json.level + '</em></h3>';
      // Range
      results += '<h3>Range: <em>' + json.range + '</em></h3>';
      // Casting time
      results += '<h3>Casting Time: <em>' + json.casting_time;
      if(json.ritual)
        results += '. Can also be cast as a ritual';
      results += '</em></h3>'
      // Duration
      results += '<h3>Duration: <em>' + json.duration;
      if(json.concentration)
        results += '. Requires concentration</em></h3>';
      results += '</em></h3>'
      // Description
      results += '<h3>Description:</h3>';
      for(let i=0; i<json.desc.length; i++)
        results += "<p>" + json.desc[i] + "</p>";
      // Components
      results += '<h3>Components:</h3><ul>';
      for(let i=0; i<json.components.length; i++) {
        if(json.components[i] == "V")
          results += "<li><strong>Verbal</strong></li>";
        else if(json.components[i] == "S")
          results += "<li><strong>Somatic</strong></li>";
        else {  // Must be material
          results += "<li><strong>Material:</strong> " + json.material + "</li>";
        }
      }
      results += '</ul>';
      results += '<h3>Available to the following classes:</h3><ul>';
      for(let i=0; i<json.classes.length; i++) {
        results += '<li>' + json.classes[i].name + '</li>';
      }

      document.getElementById("searchResults").innerHTML = results;
    });
});
