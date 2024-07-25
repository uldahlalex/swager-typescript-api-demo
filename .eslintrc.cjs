module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        },
        {
            "files": ["**/*.ts", "**/*.tsx"],
            "rules": {
                "@typescript-eslint/explicit-module-boundary-types": "warn",
                "react/jsx-uses-react": "off",
                "react/jsx-uses-vars": "error",
                "@typescript-eslint/no-unused-vars": "warn",
                "react-hooks/rules-of-hooks": "error",
                "react-hooks/exhaustive-deps": "warn"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint",
        "react",
        "react-hooks",
        "react-compiler"
    ],
    "rules": {
        'react-compiler/react-compiler': "error",
        "@typescript-eslint/no-unused-vars": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "react/prop-types": "off",
        "no-console": "warn",
        "react/jsx-key": ["error", {"checkFragmentShorthand": true}],
        "@typescript-eslint/ban-ts-comment": "off",
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};