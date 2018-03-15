Scoped.extend("module:Locale", ["module:Locale"], function (Locale) {
    var languages = <%= JSON.stringify(data) %>;
    for (var language in languages)
        Locale.mainLocale.register(languages[language], [language]);
    return {};
});
