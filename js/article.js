function showArticle(articleId) {
    const articleContent = document.getElementById(articleId);
    const articleTitre = document.getElementById('titreId'); // Utilisation de l'ID du titre
    if (articleContent.style.display === "none" || articleContent.style.display === "") {
        articleContent.style.display = "block";
        articleTitre.style.display = "none"; // Cache le titre
    } else {
        articleContent.style.display = "none";
        articleTitre.style.display = "block"; // Affiche à nouveau le titre si l'article est masqué
    }
}

