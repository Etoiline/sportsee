import { createContext } from "react"

/**
 * `createContext` contient 2 propriétés :
 * `Provider` et `Consumer`. Nous les rendons accessibles
 * via la constante `UserContext` et on initialise une
 * propriété par défaut "name" qui sera une chaîne vide.
 * On exporte ce contexte afin qu'il soit exploitable par
 * d'autres composants par la suite via le `Consumer`
 */
export const SrcContext = createContext({
  dataSource : 'MOCKED'
});

/**
 * la classe UserProvider fera office de... Provider (!)
 * en englobant son enfant direct
 * dans le composant éponyme. De cette façon, ses values
 * seront accessibles de manière globale via le `Consumer`
 */
function SrcProvider () {


    return (
      /**
       * la propriété value est très importante ici, elle rend
       * le contenu du state disponible aux `Consumers` de l'application
       */
      <SrcContext.Provider value={this.dataSource}>
        {this.props.children}
      </SrcContext.Provider>
    );

}

export default SrcProvider;