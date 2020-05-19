require("babel-register")({
  presets: ["es2015", "react"],
});

const router = require("./sitemap-router").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .build("https://www.thestreamsource.com")
    .save("./public/sitemap.xml");
}

generateSitemap();
