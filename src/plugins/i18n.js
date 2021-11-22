import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'en': {
        welcomeMsg: 'Welcome to Your Vue.js App',
        guide: 'For a guide and recipes on how to configure / customize this project,',
        checkout: 'check out the',
        plugins: 'Installed CLI Plugins',
        links: 'Essential Links',
        ecosystem: 'Ecosystem',
        users: 'users',
        services: 'services',
        roles: 'roles',
        carmodels: 'car models',
        cartypes: 'car types',
        receipts: 'receipts',
        rates: 'rates',
        workshops: 'workshops',
        customers: 'customers',
        managment: 'managment',
        newitem: 'new item',
        dashboard: 'dashboard',
        name: 'name',
        email: 'email',
        role: 'role',
        actions: 'actions',
        username: 'user name',
        password: 'password',
        clicktochooserole: 'click to choose role',
        cancel: 'cancel',
        save: 'save',
        edititem: 'edit item',
        description: 'description',
        systempercentage: 'system percentage',
        address: 'address',
        zipcode: 'zip code',
        phone: 'phone',
        workfrom: 'work from',
        workto: 'work to',
        active: 'active',
        customerservices: 'customer services',
        workshopservices: 'workshop services',
        systemprice: 'system price',
        totalprice: 'total price',
        paidtosystem: 'paid to system',
        ratecustomer: 'rate customer',
        ratworkshop: 'rate workshop',
        logout: 'logout'
    },
    'de': {
        users:	'Benutzer',
        services:	'Dienstleistungen',
        roles:	'Rollen',
        carmodels:	'Automodelle',
        cartypes:	'Autotypen',
        receipts:	'Quittungen',
        rates:	'Anteile',
        workshops:	'Werkstellen',
        customers:	'Kunden',
        managment:	'Betriebsführung',
        newitem:	'neuer Artikel',
        dashboard:	'Instrumententafel',
        name:	'Der Name',
        email:	'Das E-Mail',
        role:	'Role',
        actions:	'Aktionen',
        username:	'Der Benutzername',
        password:	'Das Passwort',
        clicktochooserole:	'Klicken Sie, um eine Rolle auszuwählen',
        cancel:	'Abbrechen',
        save:	'speichern',
        edititem:	'Artikel bearbeiten',
        description:	'Die Beschreibung',
        systempercentage:	'Systemprozentsatz',
        address:	'Die Adresse',
        zipcode:	'Die Postleitzahl',
        phone:	'Das Telefon',
        workfrom:	'arbeiten von',
        workto:	'arbeiten zu',
        active:	'aktiv',
        customerservices:	'Die Kundenbetreuung',
        workshopservices:	'Werkstattleistungen',
        systemprice:	'systempreis',
        totalprice:	'Gesamtpreis',
        paidtosystem:	'System bezahlt',
        ratecustomer:	'Kunden bewerten',
        rateworkshop:	'Werkstatt bewerten',
        logout: 'Abmelden'
    }
};

const i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'de', // set fallback locale
    messages, // set locale messages
});

export default i18n;
