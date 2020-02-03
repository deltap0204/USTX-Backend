const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const AuthController = require('../controllers/auth.tsx');

const paymentController = require('../controllers/stripe.tsx');

const ThirdParty = require('../controllers/thirdparty.tsx')

router.post('/signup', function(req, res){

  AuthController.signup(req, res)
});
router.get('/:id',function(req,res,next){
    AuthController.login_new(req,res,next)
});
router.post('/login', function(req, res, next){
  AuthController.login(req, res, next)
});
router.post('/edit_user', function(req, res, next){

    AuthController.edituser(req, res, next)
});
router.post('/GetCountry', function(req, res, next){

    return res.status(200).json({
        message: "All countries",
        countriesData:[
            {
                "name": "Afghanistan",
                "code": "af"
            },
            {
                "name": "Albania",
                "code": "al"
            },
            {
                "name": "Algeria",
                "code": "dz"
            },
            {
                "name": "Andorra",
                "code": "ad"
            },
            {
                "name": "Angola",
                "code": "ao"
            },
            {
                "name": "Anguilla",
                "code": "ai"
            },
            {
                "name": "Antigua and Barbuda",
                "code": "ag"
            },
            {
                "name": "Argentina",
                "code": "ar"
            },
            {
                "name": "Armenia",
                "code": "am"
            },
            {
                "name": "Aruba",
                "code": "aw"
            },
            {
                "name": "Australia",
                "code": "au"
            },
            {
                "name": "Austria",
                "code": "at"
            },
            {
                "name": "Azerbaijan",
                "code": "az"
            },
            {
                "name": "Bahamas",
                "code": "bs"
            },
            {
                "name": "Bahrain",
                "code": "bh"
            },
            {
                "name": "Bangladesh",
                "code": "bd"
            },
            {
                "name": "Barbados",
                "code": "bb"
            },
            {
                "name": "Belarus",
                "code": "by"
            },
            {
                "name": "Belgium",
                "code": "be"
            },
            {
                "name": "Belize",
                "code": "bz"
            },
            {
                "name": "Benin",
                "code": "bj"
            },
            {
                "name": "Bermuda",
                "code": "bm"
            },
            {
                "name": "Bhutan",
                "code": "bt"
            },
            {
                "name": "Bolivia",
                "code": "bo"
            },
            {
                "name": "Bosnia and Herzegovina",
                "code": "ba"
            },
            {
                "name": "Botswana",
                "code": "bw"
            },
            {
                "name": "Brazil",
                "code": "br"
            },
            {
                "name": "Brunei Darussalam",
                "code": "bn"
            },
            {
                "name": "Bulgaria",
                "code": "bg"
            },
            {
                "name": "Burkina Faso",
                "code": "bf"
            },
            {
                "name": "Burundi",
                "code": "bi"
            },
            {
                "name": "Cambodia",
                "code": "kh"
            },
            {
                "name": "Cameroon",
                "code": "cm"
            },
            {
                "name": "Canada",
                "code": "ca"
            },
            {
                "name": "Cape Verde",
                "code": "cv"
            },
            {
                "name": "Cayman Islands",
                "code": "ky"
            },
            {
                "name": "Central African Republic",
                "code": "cf"
            },
            {
                "name": "Chad",
                "code": "td"
            },
            {
                "name": "Chile",
                "code": "cl"
            },
            {
                "name": "China",
                "code": "cn"
            },
            {
                "name": "Christmas Island",
                "code": "cx"
            },
            {
                "name": "Cocos (Keeling) Islands",
                "code": "cc"
            },
            {
                "name": "Colombia",
                "code": "co"
            },
            {
                "name": "Comoros",
                "code": "km"
            },
            {
                "name": "Congo",
                "code": "cg"
            },
            {
                "name": "Cook Islands",
                "code": "ck"
            },
            {
                "name": "Costa Rica",
                "code": "cr"
            },
            {
                "name": "Cote D'Ivoire (Ivory Coast)",
                "code": "ci"
            },
            {
                "name": "Croatia (Hrvatska)",
                "code": "hr"
            },
            {
                "name": "Cuba",
                "code": "cu"
            },
            {
                "name": "Cyprus",
                "code": "cy"
            },
            {
                "name": "Czech Republic",
                "code": "cz"
            },
            {
                "name": "Democratic Republic of the Congo",
                "code": "cd"
            },
            {
                "name": "Denmark",
                "code": "dk"
            },
            {
                "name": "Djibouti",
                "code": "dj"
            },
            {
                "name": "Dominica",
                "code": "dm"
            },
            {
                "name": "Dominican Republic",
                "code": "do"
            },
            {
                "name": "Ecuador",
                "code": "ec"
            },
            {
                "name": "Egypt",
                "code": "eg"
            },
            {
                "name": "El Salvador",
                "code": "sv"
            },
            {
                "name": "Equatorial Guinea",
                "code": "gq"
            },
            {
                "name": "Eritrea",
                "code": "er"
            },
            {
                "name": "Estonia",
                "code": "ee"
            },
            {
                "name": "Ethiopia",
                "code": "et"
            },
            {
                "name": "Falkland Islands (Malvinas)",
                "code": "fk"
            },
            {
                "name": "Faroe Islands",
                "code": "fo"
            },
            {
                "name": "Federated States of Micronesia",
                "code": "fm"
            },
            {
                "name": "Fiji",
                "code": "fj"
            },
            {
                "name": "Finland",
                "code": "fi"
            },
            {
                "name": "France",
                "code": "fr"
            },
            {
                "name": "French Guiana",
                "code": "gf"
            },
            {
                "name": "French Polynesia",
                "code": "pf"
            },
            {
                "name": "French Southern Territories",
                "code": "tf"
            },
            {
                "name": "Gabon",
                "code": "ga"
            },
            {
                "name": "Gambia",
                "code": "gm"
            },
            {
                "name": "Georgia",
                "code": "ge"
            },
            {
                "name": "Germany",
                "code": "de"
            },
            {
                "name": "Ghana",
                "code": "gh"
            },
            {
                "name": "Gibraltar",
                "code": "gi"
            },
            {
                "name": "Great Britain (UK)",
                "code": "gb"
            },
            {
                "name": "Greece",
                "code": "gr"
            },
            {
                "name": "Greenland",
                "code": "gl"
            },
            {
                "name": "Grenada",
                "code": "gd"
            },
            {
                "name": "Guadeloupe",
                "code": "gp"
            },
            {
                "name": "Guatemala",
                "code": "gt"
            },
            {
                "name": "Guinea",
                "code": "gn"
            },
            {
                "name": "Guinea-Bissau",
                "code": "gw"
            },
            {
                "name": "Guyana",
                "code": "gy"
            },
            {
                "name": "Haiti",
                "code": "ht"
            },
            {
                "name": "Honduras",
                "code": "hn"
            },
            {
                "name": "Hong Kong",
                "code": "hk"
            },
            {
                "name": "Hungary",
                "code": "hu"
            },
            {
                "name": "Iceland",
                "code": "is"
            },
            {
                "name": "India",
                "code": "in"
            },
            {
                "name": "Indonesia",
                "code": "id"
            },
            {
                "name": "Iran",
                "code": "ir"
            },
            {
                "name": "Iraq",
                "code": "iq"
            },
            {
                "name": "Ireland",
                "code": "ie"
            },
            {
                "name": "Israel",
                "code": "il"
            },
            {
                "name": "Italy",
                "code": "it"
            },
            {
                "name": "Jamaica",
                "code": "jm"
            },
            {
                "name": "Japan",
                "code": "jp"
            },
            {
                "name": "Jordan",
                "code": "jo"
            },
            {
                "name": "Kazakhstan",
                "code": "kz"
            },
            {
                "name": "Kenya",
                "code": "ke"
            },
            {
                "name": "Kiribati",
                "code": "ki"
            },
            {
                "name": "Korea (North)",
                "code": "kp"
            },
            {
                "name": "Korea (South)",
                "code": "kr"
            },
            {
                "name": "Kuwait",
                "code": "kw"
            },
            {
                "name": "Kyrgyzstan",
                "code": "kg"
            },
            {
                "name": "Laos",
                "code": "la"
            },
            {
                "name": "Latvia",
                "code": "lv"
            },
            {
                "name": "Lebanon",
                "code": "lb"
            },
            {
                "name": "Lesotho",
                "code": "ls"
            },
            {
                "name": "Liberia",
                "code": "lr"
            },
            {
                "name": "Libya",
                "code": "ly"
            },
            {
                "name": "Liechtenstein",
                "code": "li"
            },
            {
                "name": "Lithuania",
                "code": "lt"
            },
            {
                "name": "Luxembourg",
                "code": "lu"
            },
            {
                "name": "Macao",
                "code": "mo"
            },
            {
                "name": "Macedonia",
                "code": "mk"
            },
            {
                "name": "Madagascar",
                "code": "mg"
            },
            {
                "name": "Malawi",
                "code": "mw"
            },
            {
                "name": "Malaysia",
                "code": "my"
            },
            {
                "name": "Maldives",
                "code": "mv"
            },
            {
                "name": "Mali",
                "code": "ml"
            },
            {
                "name": "Malta",
                "code": "mt"
            },
            {
                "name": "Marshall Islands",
                "code": "mh"
            },
            {
                "name": "Martinique",
                "code": "mq"
            },
            {
                "name": "Mauritania",
                "code": "mr"
            },
            {
                "name": "Mauritius",
                "code": "mu"
            },
            {
                "name": "Mayotte",
                "code": "yt"
            },
            {
                "name": "Mexico",
                "code": "mx"
            },
            {
                "name": "Moldova",
                "code": "md"
            },
            {
                "name": "Monaco",
                "code": "mc"
            },
            {
                "name": "Mongolia",
                "code": "mn"
            },
            {
                "name": "Montserrat",
                "code": "ms"
            },
            {
                "name": "Morocco",
                "code": "ma"
            },
            {
                "name": "Mozambique",
                "code": "mz"
            },
            {
                "name": "Myanmar",
                "code": "mm"
            },
            {
                "name": "Namibia",
                "code": "na"
            },
            {
                "name": "Nauru",
                "code": "nr"
            },
            {
                "name": "Nepal",
                "code": "np"
            },
            {
                "name": "Netherlands",
                "code": "nl"
            },
            {
                "name": "Netherlands Antilles",
                "code": "an"
            },
            {
                "name": "New Caledonia",
                "code": "nc"
            },
            {
                "name": "New Zealand (Aotearoa)",
                "code": "nz"
            },
            {
                "name": "Nicaragua",
                "code": "ni"
            },
            {
                "name": "Niger",
                "code": "ne"
            },
            {
                "name": "Nigeria",
                "code": "ng"
            },
            {
                "name": "Niue",
                "code": "nu"
            },
            {
                "name": "Norfolk Island",
                "code": "nf"
            },
            {
                "name": "Northern Mariana Islands",
                "code": "mp"
            },
            {
                "name": "Norway",
                "code": "no"
            },
            {
                "name": "NULL",
                "code": "gg"
            },
            {
                "name": "Oman",
                "code": "om"
            },
            {
                "name": "Pakistan",
                "code": "pk"
            },
            {
                "name": "Palau",
                "code": "pw"
            },
            {
                "name": "Palestinian Territory",
                "code": "ps"
            },
            {
                "name": "Panama",
                "code": "pa"
            },
            {
                "name": "Papua New Guinea",
                "code": "pg"
            },
            {
                "name": "Paraguay",
                "code": "py"
            },
            {
                "name": "Peru",
                "code": "pe"
            },
            {
                "name": "Philippines",
                "code": "ph"
            },
            {
                "name": "Pitcairn",
                "code": "pn"
            },
            {
                "name": "Poland",
                "code": "pl"
            },
            {
                "name": "Portugal",
                "code": "pt"
            },
            {
                "name": "Qatar",
                "code": "qa"
            },
            {
                "name": "Reunion",
                "code": "re"
            },
            {
                "name": "Romania",
                "code": "ro"
            },
            {
                "name": "Russian Federation",
                "code": "ru"
            },
            {
                "name": "Rwanda",
                "code": "rw"
            },
            {
                "name": "S. Georgia and S. Sandwich Islands",
                "code": "gs"
            },
            {
                "name": "Saint Helena",
                "code": "sh"
            },
            {
                "name": "Saint Kitts and Nevis",
                "code": "kn"
            },
            {
                "name": "Saint Lucia",
                "code": "lc"
            },
            {
                "name": "Saint Pierre and Miquelon",
                "code": "pm"
            },
            {
                "name": "Saint Vincent and the Grenadines",
                "code": "vc"
            },
            {
                "name": "Samoa",
                "code": "ws"
            },
            {
                "name": "San Marino",
                "code": "sm"
            },
            {
                "name": "Sao Tome and Principe",
                "code": "st"
            },
            {
                "name": "Saudi Arabia",
                "code": "sa"
            },
            {
                "name": "Senegal",
                "code": "sn"
            },
            {
                "name": "Seychelles",
                "code": "sc"
            },
            {
                "name": "Sierra Leone",
                "code": "sl"
            },
            {
                "name": "Singapore",
                "code": "sg"
            },
            {
                "name": "Slovakia",
                "code": "sk"
            },
            {
                "name": "Slovenia",
                "code": "si"
            },
            {
                "name": "Solomon Islands",
                "code": "sb"
            },
            {
                "name": "Somalia",
                "code": "so"
            },
            {
                "name": "South Africa",
                "code": "za"
            },
            {
                "name": "Spain",
                "code": "es"
            },
            {
                "name": "Sri Lanka",
                "code": "lk"
            },
            {
                "name": "Sudan",
                "code": "sd"
            },
            {
                "name": "Suriname",
                "code": "sr"
            },
            {
                "name": "Svalbard and Jan Mayen",
                "code": "sj"
            },
            {
                "name": "Swaziland",
                "code": "sz"
            },
            {
                "name": "Sweden",
                "code": "se"
            },
            {
                "name": "Switzerland",
                "code": "ch"
            },
            {
                "name": "Syria",
                "code": "sy"
            },
            {
                "name": "Taiwan",
                "code": "tw"
            },
            {
                "name": "Tajikistan",
                "code": "tj"
            },
            {
                "name": "Tanzania",
                "code": "tz"
            },
            {
                "name": "Thailand",
                "code": "th"
            },
            {
                "name": "Togo",
                "code": "tg"
            },
            {
                "name": "Tokelau",
                "code": "tk"
            },
            {
                "name": "Tonga",
                "code": "to"
            },
            {
                "name": "Trinidad and Tobago",
                "code": "tt"
            },
            {
                "name": "Tunisia",
                "code": "tn"
            },
            {
                "name": "Turkey",
                "code": "tr"
            },
            {
                "name": "Turkmenistan",
                "code": "tm"
            },
            {
                "name": "Turks and Caicos Islands",
                "code": "tc"
            },
            {
                "name": "Tuvalu",
                "code": "tv"
            },
            {
                "name": "Uganda",
                "code": "ug"
            },
            {
                "name": "Ukraine",
                "code": "ua"
            },
            {
                "name": "United Arab Emirates",
                "code": "ae"
            },
            {
                "name": "United States of America",
                "code": "us"
            },
            {
                "name": "Uruguay",
                "code": "uy"
            },
            {
                "name": "Uzbekistan",
                "code": "uz"
            },
            {
                "name": "Vanuatu",
                "code": "vu"
            },
            {
                "name": "Venezuela",
                "code": "ve"
            },
            {
                "name": "Viet Nam",
                "code": "vn"
            },
            {
                "name": "Virgin Islands (British)",
                "code": "vg"
            },
            {
                "name": "Virgin Islands (U.S.)",
                "code": "vi"
            },
            {
                "name": "Wallis and Futuna",
                "code": "wf"
            },
            {
                "name": "Western Sahara",
                "code": "eh"
            },
            {
                "name": "Yemen",
                "code": "ye"
            },
            {
                "name": "Zaire (former)",
                "code": "zr"
            },
            {
                "name": "Zambia",
                "code": "zm"
            },
            {
                "name": "Zimbabwe",
                "code": "zw"
            }
        ]


    });
});

router.post('/GetStates', function(req, res, next){

                if(req.body.codecode== "af"){
                    return res.status(200).json({
statesData:[
    {
        "region": "Badakhshan",
        "country": "af"
    },
    {
        "region": "Badghis",
        "country": "af"
    },
    {
        "region": "Balkh",
        "country": "af"
    },
    {
        "region": "Daykundi Province",
        "country": "af"
    },
    {
        "region": "Farah",
        "country": "af"
    },
    {
        "region": "Faryab Province",
        "country": "af"
    },
    {
        "region": "Helmand",
        "country": "af"
    },
    {
        "region": "Herat",
        "country": "af"
    },
    {
        "region": "Kandahar",
        "country": "af"
    },
    {
        "region": "Kunduz",
        "country": "af"
    },
    {
        "region": "Nangarhar",
        "country": "af"
    },
    {
        "region": "Panjshir",
        "country": "af"
    },
    {
        "region": "Parwan",
        "country": "af"
    },
    {
        "region": "Samangan",
        "country": "af"
    },
    {
        "region": "Sar-e Pul",
        "country": "af"
    },
    {
        "region": "Uruzgan",
        "country": "af"
    },
    {
        "region": "Velayat-e Khowst",
        "country": "af"
    },
    {
        "region": "Velayat-e Nurestan",
        "country": "af"
    },
    {
        "region": "Wardak",
        "country": "af"
    },
    {
        "region": "Wilayat-e Baghlan",
        "country": "af"
    },
    {
        "region": "Wilayat-e Bamyan",
        "country": "af"
    },
    {
        "region": "Wilayat-e Ghazni",
        "country": "af"
    },
    {
        "region": "Wilayat-e Ghor",
        "country": "af"
    },
    {
        "region": "Wilayat-e Jowzjan",
        "country": "af"
    },
    {
        "region": "Wilayat-e Kabul",
        "country": "af"
    },
    {
        "region": "Wilayat-e Kapisa",
        "country": "af"
    },
    {
        "region": "Wilayat-e Kunar",
        "country": "af"
    },
    {
        "region": "Wilayat-e Laghman",
        "country": "af"
    },
    {
        "region": "Wilayat-e Logar",
        "country": "af"
    },
    {
        "region": "Wilayat-e Nimroz",
        "country": "af"
    },
    {
        "region": "Wilayat-e Paktika",
        "country": "af"
    },
    {
        "region": "Wilayat-e Paktiya",
        "country": "af"
    },
    {
        "region": "Wilayat-e Takhar",
        "country": "af"
    },
    {
        "region": "Wilayat-e Zabul",
        "country": "af"
    }
]
                    });
                }


                if(req.body.codecode== "al"){
                    return res.status(200).json({
                        statesData:[
                            {
                                "region": "Qarku i Beratit",
                                "country": "al"
                            },
                            {
                                "region": "Qarku i Dibres",
                                "country": "al"
                            },
                            {
                                "region": "Qarku i Durresit",
                                "country": "al"
                            },
                            {
                                "region": "Qarku i Elbasanit",
                                "country": "al"
                            },
                            {
                                "region": "Qarku i Fierit",
                                "country": "al"
                            },
                            {
                                "region": "Qarku i Gjirokastres",
                                "country": "al"
                            },
                            {
                                "region": "Qarku i Korces",
                                "country": "al"
                            },
                            {
                                "region": "Qarku i Kukesit",
                                "country": "al"
                            },
                            {
                                "region": "Qarku i Lezhes",
                                "country": "al"
                            },
                            {
                                "region": "Qarku i Shkodres",
                                "country": "al"
                            },
                            {
                                "region": "Qarku i Tiranes",
                                "country": "al"
                            },
                            {
                                "region": "Qarku i Vlores",
                                "country": "al"
                            }
                        ]
                    });
                }


                if(req.body.codecode== "dz"){
                    return res.status(200).json({
                        statesData:[
                            {
                                "region": "Adrar",
                                "country": "dz"
                            },
                            {
                                "region": "Annaba",
                                "country": "dz"
                            },
                            {
                                "region": "El Bayadh",
                                "country": "dz"
                            },
                            {
                                "region": "El Oued",
                                "country": "dz"
                            },
                            {
                                "region": "El Tarf",
                                "country": "dz"
                            },
                            {
                                "region": "Illizi",
                                "country": "dz"
                            },
                            {
                                "region": "Oran",
                                "country": "dz"
                            },
                            {
                                "region": "Oum el Bouaghi",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya d' Alger",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Ain Defla",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Ain Temouchent",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Batna",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Bechar",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Bejaia",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Biskra",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Blida",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Bordj Bou Arreridj",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Bouira",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Boumerdes",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Chlef",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Constantine",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Djelfa",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Ghardaia",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Guelma",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Jijel",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Khenchela",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Laghouat",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de M'Sila",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Mascara",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Medea",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Mila",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Mostaganem",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Naama",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Ouargla",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Relizane",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Saida",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Setif",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Sidi Bel Abbes",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Skikda",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Souk Ahras",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Tamanrasset",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Tebessa",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Tiaret",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Tindouf",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Tipaza",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Tissemsilt",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Tizi Ouzou",
                                "country": "dz"
                            },
                            {
                                "region": "Wilaya de Tlemcen",
                                "country": "dz"
                            }
                        ]
                    });
                }


                if(req.body.codecode== "ad"){
                    return res.status(200).json({
                        statesData:[
                            {
                                "region": "Andorra la Vella",
                                "country": "ad"
                            },
                            {
                                "region": "Canillo",
                                "country": "ad"
                            },
                            {
                                "region": "Encamp",
                                "country": "ad"
                            },
                            {
                                "region": "Escaldes-Engordany",
                                "country": "ad"
                            },
                            {
                                "region": "La Massana",
                                "country": "ad"
                            },
                            {
                                "region": "Ordino",
                                "country": "ad"
                            },
                            {
                                "region": "Sant Julia de Loria",
                                "country": "ad"
                            }
                        ]
                    });
                }

                if(req.body.codecode== "ao"){
                    return res.status(200).json({
                        statesData:[
                            {
                                "region": "Bengo Province",
                                "country": "ao"
                            },
                            {
                                "region": "Benguela",
                                "country": "ao"
                            },
                            {
                                "region": "Cabinda",
                                "country": "ao"
                            },
                            {
                                "region": "Cuanza Norte Province",
                                "country": "ao"
                            },
                            {
                                "region": "Cunene Province",
                                "country": "ao"
                            },
                            {
                                "region": "Huambo",
                                "country": "ao"
                            },
                            {
                                "region": "Huila Province",
                                "country": "ao"
                            },
                            {
                                "region": "Kuando Kubango",
                                "country": "ao"
                            },
                            {
                                "region": "Kwanza Sul",
                                "country": "ao"
                            },
                            {
                                "region": "Luanda Province",
                                "country": "ao"
                            },
                            {
                                "region": "Lunda Norte Province",
                                "country": "ao"
                            },
                            {
                                "region": "Lunda Sul",
                                "country": "ao"
                            },
                            {
                                "region": "Malanje Province",
                                "country": "ao"
                            },
                            {
                                "region": "Moxico",
                                "country": "ao"
                            },
                            {
                                "region": "Namibe Province",
                                "country": "ao"
                            },
                            {
                                "region": "Provincia do Bie",
                                "country": "ao"
                            },
                            {
                                "region": "Provincia do Uige",
                                "country": "ao"
                            },
                            {
                                "region": "Zaire",
                                "country": "ao"
                            }
                        ]
                    });
                }

                if(req.body.codecode== "ai"){
                    return res.status(200).json({
                        statesData:[
                            {
                                "region": "Blowing Point",
                                "country": "ai"
                            },
                            {
                                "region": "East End",
                                "country": "ai"
                            },
                            {
                                "region": "George Hill",
                                "country": "ai"
                            },
                            {
                                "region": "Island Harbour",
                                "country": "ai"
                            },
                            {
                                "region": "North Hill",
                                "country": "ai"
                            },
                            {
                                "region": "North Side",
                                "country": "ai"
                            },
                            {
                                "region": "Sandy Ground",
                                "country": "ai"
                            },
                            {
                                "region": "Sandy Hill",
                                "country": "ai"
                            },
                            {
                                "region": "South Hill",
                                "country": "ai"
                            },
                            {
                                "region": "Stoney Ground",
                                "country": "ai"
                            },
                            {
                                "region": "The Farrington",
                                "country": "ai"
                            },
                            {
                                "region": "The Quarter",
                                "country": "ai"
                            },
                            {
                                "region": "The Valley",
                                "country": "ai"
                            },
                            {
                                "region": "West End",
                                "country": "ai"
                            }
                        ]
                    });
                }

                if(req.body.codecode== "ag"){
                    return res.status(200).json({
                        statesData:[
                            {
                                "region": "Barbuda",
                                "country": "ag"
                            },
                            {
                                "region": "Parish of Saint George",
                                "country": "ag"
                            },
                            {
                                "region": "Parish of Saint John",
                                "country": "ag"
                            },
                            {
                                "region": "Parish of Saint Mary",
                                "country": "ag"
                            },
                            {
                                "region": "Parish of Saint Paul",
                                "country": "ag"
                            },
                            {
                                "region": "Parish of Saint Peter",
                                "country": "ag"
                            },
                            {
                                "region": "Parish of Saint Philip",
                                "country": "ag"
                            },
                            {
                                "region": "Redonda",
                                "country": "ag"
                            }
                        ]
                    });
                }

                if(req.body.codecode== "ar"){
                    return res.status(200).json({
                        statesData:[
                            {
                                "region": "Catamarca Province",
                                "country": "ar"
                            },
                            {
                                "region": "Chaco Province",
                                "country": "ar"
                            },
                            {
                                "region": "Chubut Province",
                                "country": "ar"
                            },
                            {
                                "region": "Ciudad Autonoma de Buenos Aires",
                                "country": "ar"
                            },
                            {
                                "region": "Cordoba Province",
                                "country": "ar"
                            },
                            {
                                "region": "Corrientes Province",
                                "country": "ar"
                            },
                            {
                                "region": "Entre Rios Province",
                                "country": "ar"
                            },
                            {
                                "region": "Formosa Province",
                                "country": "ar"
                            },
                            {
                                "region": "Jujuy Province",
                                "country": "ar"
                            },
                            {
                                "region": "La Pampa Province",
                                "country": "ar"
                            },
                            {
                                "region": "La Rioja Province",
                                "country": "ar"
                            },
                            {
                                "region": "Mendoza Province",
                                "country": "ar"
                            },
                            {
                                "region": "Misiones Province",
                                "country": "ar"
                            },
                            {
                                "region": "Neuquen Province",
                                "country": "ar"
                            },
                            {
                                "region": "Provincia de Buenos Aires",
                                "country": "ar"
                            },
                            {
                                "region": "Rio Negro Province",
                                "country": "ar"
                            },
                            {
                                "region": "Salta Province",
                                "country": "ar"
                            },
                            {
                                "region": "San Juan Province",
                                "country": "ar"
                            },
                            {
                                "region": "San Luis Province",
                                "country": "ar"
                            },
                            {
                                "region": "Santa Cruz Province",
                                "country": "ar"
                            },
                            {
                                "region": "Santa Fe Province",
                                "country": "ar"
                            },
                            {
                                "region": "Santiago del Estero Province",
                                "country": "ar"
                            },
                            {
                                "region": "Tierra del Fuego Province",
                                "country": "ar"
                            },
                            {
                                "region": "Tucuman Province",
                                "country": "ar"
                            }
                        ]
                    });
                }

                if(req.body.codecode== "am"){
                    return res.status(200).json({
                        statesData:[
                            {
                                "region": "Aragatsotni Marz",
                                "country": "am"
                            },
                            {
                                "region": "Ararati Marz",
                                "country": "am"
                            },
                            {
                                "region": "Armaviri Marz",
                                "country": "am"
                            },
                            {
                                "region": "Geghark'unik'i Marz",
                                "country": "am"
                            },
                            {
                                "region": "Kotayk'i Marz",
                                "country": "am"
                            },
                            {
                                "region": "Lorru Marz",
                                "country": "am"
                            },
                            {
                                "region": "Shiraki Marz",
                                "country": "am"
                            },
                            {
                                "region": "Syunik'i Marz",
                                "country": "am"
                            },
                            {
                                "region": "Tavushi Marz",
                                "country": "am"
                            },
                            {
                                "region": "Vayots' Dzor",
                                "country": "am"
                            },
                            {
                                "region": "Yerevan",
                                "country": "am"
                            }
                        ]
                    });
                }

                if(req.body.codecode== "aw"){
                    return res.status(200).json({
                        statesData:[]
                    });
                }

                if(req.body.codecode== "au"){
                    return res.status(200).json({
                        statesData:[
                            {
                                "region": "Australian Capital Territory",
                                "country": "au"
                            },
                            {
                                "region": "Northern Territory",
                                "country": "au"
                            },
                            {
                                "region": "State of New South Wales",
                                "country": "au"
                            },
                            {
                                "region": "State of Queensland",
                                "country": "au"
                            },
                            {
                                "region": "State of South Australia",
                                "country": "au"
                            },
                            {
                                "region": "State of Tasmania",
                                "country": "au"
                            },
                            {
                                "region": "State of Victoria",
                                "country": "au"
                            },
                            {
                                "region": "State of Western Australia",
                                "country": "au"
                            }
                        ]
                    });
                }

                if(req.body.codecode== "at"){
                    return res.status(200).json({
                        statesData:[
                            {
                                "region": "Burgenland",
                                "country": "at"
                            },
                            {
                                "region": "Kaernten",
                                "country": "at"
                            },
                            {
                                "region": "Niederoesterreich",
                                "country": "at"
                            },
                            {
                                "region": "Oberoesterreich",
                                "country": "at"
                            },
                            {
                                "region": "Salzburg",
                                "country": "at"
                            },
                            {
                                "region": "Steiermark",
                                "country": "at"
                            },
                            {
                                "region": "Tirol",
                                "country": "at"
                            },
                            {
                                "region": "Vorarlberg",
                                "country": "at"
                            },
                            {
                                "region": "Wien",
                                "country": "at"
                            }
                        ]
                    });
                }

                if(req.body.codecode== "az"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Absheron Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Aghdam Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Aghdash Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Aghjabadi Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Aghstafa Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Aghsu Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Astara District",
                            "country": "az"
                        },
                        {
                            "region": "Baku City",
                            "country": "az"
                        },
                        {
                            "region": "Balakan Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Barda Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Beylagan Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Bilasuvar Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Dashkasan Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Fizuli Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Gadabay Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Ganja City",
                            "country": "az"
                        },
                        {
                            "region": "Gobustan Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Goranboy Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Goychay Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Goygol Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Hajigabul Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Imishli Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Ismayilli Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Jabrayil District",
                            "country": "az"
                        },
                        {
                            "region": "Jalilabad",
                            "country": "az"
                        },
                        {
                            "region": "Kalbajar District",
                            "country": "az"
                        },
                        {
                            "region": "Khachmaz Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Khizi Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Khojavend District",
                            "country": "az"
                        },
                        {
                            "region": "Kurdamir Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Lacin Rayonu",
                            "country": "az"
                        },
                        {
                            "region": "Lankaran Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Lankaran Sahari",
                            "country": "az"
                        },
                        {
                            "region": "Lerik Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Masally District",
                            "country": "az"
                        },
                        {
                            "region": "Mingacevir City",
                            "country": "az"
                        },
                        {
                            "region": "Naftalan City",
                            "country": "az"
                        },
                        {
                            "region": "Nakhchivan",
                            "country": "az"
                        },
                        {
                            "region": "Nakhchivan Autonomous Republic",
                            "country": "az"
                        },
                        {
                            "region": "Neftchala Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Oghuz Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Qabala Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Qakh Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Qazakh Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Quba Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Qubadli Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Qusar Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Saatly Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Sabirabad Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Salyan Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Samukh Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Shabran Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Shaki city",
                            "country": "az"
                        },
                        {
                            "region": "Shaki Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Shamakhi Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Shamkir Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Shirvan",
                            "country": "az"
                        },
                        {
                            "region": "Shusha",
                            "country": "az"
                        },
                        {
                            "region": "Siazan Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Sumqayit City",
                            "country": "az"
                        },
                        {
                            "region": "Susa Rayonu",
                            "country": "az"
                        },
                        {
                            "region": "Tartar Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Tovuz Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Ujar Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Xankandi Sahari",
                            "country": "az"
                        },
                        {
                            "region": "Xocali Rayonu",
                            "country": "az"
                        },
                        {
                            "region": "Yardymli Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Yevlakh City",
                            "country": "az"
                        },
                        {
                            "region": "Yevlakh Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Zangilan Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Zaqatala Rayon",
                            "country": "az"
                        },
                        {
                            "region": "Zardab Rayon",
                            "country": "az"
                        }
                    ]
                });}

                if(req.body.codecode== "bs"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Acklins Island District",
                            "country": "bs"
                        },
                        {
                            "region": "Berry Islands District",
                            "country": "bs"
                        },
                        {
                            "region": "Bimini District",
                            "country": "bs"
                        },
                        {
                            "region": "Black Point District",
                            "country": "bs"
                        },
                        {
                            "region": "Cat Island",
                            "country": "bs"
                        },
                        {
                            "region": "Central Abaco District",
                            "country": "bs"
                        },
                        {
                            "region": "Central Andros District",
                            "country": "bs"
                        },
                        {
                            "region": "Central Eleuthera District",
                            "country": "bs"
                        },
                        {
                            "region": "City of Freeport District",
                            "country": "bs"
                        },
                        {
                            "region": "Crooked Island and Long Cay District",
                            "country": "bs"
                        },
                        {
                            "region": "East Grand Bahama District",
                            "country": "bs"
                        },
                        {
                            "region": "Exuma District",
                            "country": "bs"
                        },
                        {
                            "region": "Grand Cay District",
                            "country": "bs"
                        },
                        {
                            "region": "Harbour Island District",
                            "country": "bs"
                        },
                        {
                            "region": "Hope Town District",
                            "country": "bs"
                        },
                        {
                            "region": "Inagua",
                            "country": "bs"
                        },
                        {
                            "region": "Long Island",
                            "country": "bs"
                        },
                        {
                            "region": "Mangrove Cay",
                            "country": "bs"
                        },
                        {
                            "region": "Mayaguana District",
                            "country": "bs"
                        },
                        {
                            "region": "Moore's Island District",
                            "country": "bs"
                        },
                        {
                            "region": "New Providence District",
                            "country": "bs"
                        },
                        {
                            "region": "North Abaco District",
                            "country": "bs"
                        },
                        {
                            "region": "North Andros District",
                            "country": "bs"
                        },
                        {
                            "region": "North Eleuthera District",
                            "country": "bs"
                        },
                        {
                            "region": "Ragged Island District",
                            "country": "bs"
                        },
                        {
                            "region": "Rum Cay",
                            "country": "bs"
                        },
                        {
                            "region": "San Salvador District",
                            "country": "bs"
                        },
                        {
                            "region": "South Abaco District",
                            "country": "bs"
                        },
                        {
                            "region": "South Andros",
                            "country": "bs"
                        },
                        {
                            "region": "South Eleuthera",
                            "country": "bs"
                        },
                        {
                            "region": "Spanish Wells District",
                            "country": "bs"
                        },
                        {
                            "region": "West Grand Bahama District",
                            "country": "bs"
                        }
                    ]
                });}

                if(req.body.codecode== "bh"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Capital Governorate",
                            "country": "bh"
                        },
                        {
                            "region": "Muharraq Governorate",
                            "country": "bh"
                        },
                        {
                            "region": "Northern Governorate",
                            "country": "bh"
                        },
                        {
                            "region": "Southern Governorate",
                            "country": "bh"
                        }
                    ]
                });}

                if(req.body.codecode== "bd"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Barisal Division",
                            "country": "bd"
                        },
                        {
                            "region": "Chittagong",
                            "country": "bd"
                        },
                        {
                            "region": "Dhaka Division",
                            "country": "bd"
                        },
                        {
                            "region": "Khulna Division",
                            "country": "bd"
                        },
                        {
                            "region": "Mymensingh Division",
                            "country": "bd"
                        },
                        {
                            "region": "Rajshahi Division",
                            "country": "bd"
                        },
                        {
                            "region": "Rangpur Division",
                            "country": "bd"
                        },
                        {
                            "region": "Sylhet Division",
                            "country": "bd"
                        }
                    ]
                });}

                if(req.body.codecode== "bb"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Christ Church",
                            "country": "bb"
                        },
                        {
                            "region": "Saint Andrew",
                            "country": "bb"
                        },
                        {
                            "region": "Saint George",
                            "country": "bb"
                        },
                        {
                            "region": "Saint James",
                            "country": "bb"
                        },
                        {
                            "region": "Saint John",
                            "country": "bb"
                        },
                        {
                            "region": "Saint Joseph",
                            "country": "bb"
                        },
                        {
                            "region": "Saint Lucy",
                            "country": "bb"
                        },
                        {
                            "region": "Saint Michael",
                            "country": "bb"
                        },
                        {
                            "region": "Saint Peter",
                            "country": "bb"
                        },
                        {
                            "region": "Saint Philip",
                            "country": "bb"
                        },
                        {
                            "region": "Saint Thomas",
                            "country": "bb"
                        }
                    ]
                });}
              if(req.body.codecode== "by"){return res.status(200).json({
                  statesData:[
                      {
                          "region": "Brest Oblast",
                          "country": "by"
                      },
                      {
                          "region": "Gomel Oblast",
                          "country": "by"
                      },
                      {
                          "region": "Grodno Oblast",
                          "country": "by"
                      },
                      {
                          "region": "Horad Minsk",
                          "country": "by"
                      },
                      {
                          "region": "Minsk Oblast",
                          "country": "by"
                      },
                      {
                          "region": "Mogilyov Oblast",
                          "country": "by"
                      },
                      {
                          "region": "Vitebsk Oblast",
                          "country": "by"
                      }
                  ]
              });}

                if(req.body.codecode== "be"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Bruxelles-Capitale",
                            "country": "be"
                        },
                        {
                            "region": "Flanders",
                            "country": "be"
                        },
                        {
                            "region": "Wallonia",
                            "country": "be"
                        }
                    ]
                });}

                if(req.body.codecode== "bz"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Belize District",
                            "country": "bz"
                        },
                        {
                            "region": "Cayo District",
                            "country": "bz"
                        },
                        {
                            "region": "Corozal District",
                            "country": "bz"
                        },
                        {
                            "region": "Orange Walk District",
                            "country": "bz"
                        },
                        {
                            "region": "Stann Creek District",
                            "country": "bz"
                        },
                        {
                            "region": "Toledo District",
                            "country": "bz"
                        }
                    ]
                });}

                if(req.body.codecode== "bj"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Alibori",
                            "country": "bj"
                        },
                        {
                            "region": "Atakora Department",
                            "country": "bj"
                        },
                        {
                            "region": "Atlantique Department",
                            "country": "bj"
                        },
                        {
                            "region": "Borgou Department",
                            "country": "bj"
                        },
                        {
                            "region": "Collines Department",
                            "country": "bj"
                        },
                        {
                            "region": "Departement de l'Oueme",
                            "country": "bj"
                        },
                        {
                            "region": "Donga",
                            "country": "bj"
                        },
                        {
                            "region": "Kouffo Department",
                            "country": "bj"
                        },
                        {
                            "region": "Littoral",
                            "country": "bj"
                        },
                        {
                            "region": "Mono",
                            "country": "bj"
                        },
                        {
                            "region": "Plateau Department",
                            "country": "bj"
                        },
                        {
                            "region": "Zou Department",
                            "country": "bj"
                        }
                    ]
                });}

                if(req.body.codecode== "bm"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Devonshire Parish",
                            "country": "bm"
                        },
                        {
                            "region": "Hamilton",
                            "country": "bm"
                        },
                        {
                            "region": "Paget Parish",
                            "country": "bm"
                        },
                        {
                            "region": "Pembroke Parish",
                            "country": "bm"
                        },
                        {
                            "region": "Saint George",
                            "country": "bm"
                        },
                        {
                            "region": "Saint George's Parish",
                            "country": "bm"
                        },
                        {
                            "region": "Sandys Parish",
                            "country": "bm"
                        },
                        {
                            "region": "Smith's Parish",
                            "country": "bm"
                        },
                        {
                            "region": "Southampton Parish",
                            "country": "bm"
                        },
                        {
                            "region": "Warwick Parish",
                            "country": "bm"
                        }
                    ]
                });}

                if(req.body.codecode== "bt"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Bumthang Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Chhukha Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Dagana Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Gasa",
                            "country": "bt"
                        },
                        {
                            "region": "Haa Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Lhuentse Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Mongar Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Paro Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Pemagatshel Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Punakha Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Samdrup Jongkhar Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Samtse Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Sarpang Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Thimphu Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Trashi Yangste",
                            "country": "bt"
                        },
                        {
                            "region": "Trashigang Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Trongsa Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Tsirang Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Wangdue Phodrang Dzongkhag",
                            "country": "bt"
                        },
                        {
                            "region": "Zhemgang Dzongkhag",
                            "country": "bt"
                        }
                    ]
                });}

                if(req.body.codecode== "bo"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Departamento de Chuquisaca",
                            "country": "bo"
                        },
                        {
                            "region": "Departamento de Cochabamba",
                            "country": "bo"
                        },
                        {
                            "region": "Departamento de La Paz",
                            "country": "bo"
                        },
                        {
                            "region": "Departamento de Oruro",
                            "country": "bo"
                        },
                        {
                            "region": "Departamento de Pando",
                            "country": "bo"
                        },
                        {
                            "region": "Departamento de Potosi",
                            "country": "bo"
                        },
                        {
                            "region": "Departamento de Santa Cruz",
                            "country": "bo"
                        },
                        {
                            "region": "Departamento de Tarija",
                            "country": "bo"
                        },
                        {
                            "region": "El Beni",
                            "country": "bo"
                        }
                    ]
                });}

                if(req.body.codecode== "ba"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Brcko",
                            "country": "ba"
                        },
                        {
                            "region": "Federation of Bosnia and Herzegovina",
                            "country": "ba"
                        },
                        {
                            "region": "Republika Srpska",
                            "country": "ba"
                        }
                    ]
                });}

                if(req.body.codecode== "bw"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Central District",
                            "country": "bw"
                        },
                        {
                            "region": "Ghanzi District",
                            "country": "bw"
                        },
                        {
                            "region": "Kgalagadi District",
                            "country": "bw"
                        },
                        {
                            "region": "Kgatleng District",
                            "country": "bw"
                        },
                        {
                            "region": "Kweneng District",
                            "country": "bw"
                        },
                        {
                            "region": "North East District",
                            "country": "bw"
                        },
                        {
                            "region": "North West District",
                            "country": "bw"
                        },
                        {
                            "region": "South East District",
                            "country": "bw"
                        },
                        {
                            "region": "Southern District",
                            "country": "bw"
                        }
                    ]
                });}


                if(req.body.codecode== "br"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Acre",
                            "country": "br"
                        },
                        {
                            "region": "Alagoas",
                            "country": "br"
                        },
                        {
                            "region": "Amapa",
                            "country": "br"
                        },
                        {
                            "region": "Amazonas",
                            "country": "br"
                        },
                        {
                            "region": "Bahia",
                            "country": "br"
                        },
                        {
                            "region": "Ceara",
                            "country": "br"
                        },
                        {
                            "region": "Espirito Santo",
                            "country": "br"
                        },
                        {
                            "region": "Federal District",
                            "country": "br"
                        },
                        {
                            "region": "Goias",
                            "country": "br"
                        },
                        {
                            "region": "Maranhao",
                            "country": "br"
                        },
                        {
                            "region": "Mato Grosso",
                            "country": "br"
                        },
                        {
                            "region": "Mato Grosso do Sul",
                            "country": "br"
                        },
                        {
                            "region": "Minas Gerais",
                            "country": "br"
                        },
                        {
                            "region": "Para",
                            "country": "br"
                        },
                        {
                            "region": "Paraiba",
                            "country": "br"
                        },
                        {
                            "region": "Parana",
                            "country": "br"
                        },
                        {
                            "region": "Pernambuco",
                            "country": "br"
                        },
                        {
                            "region": "Piaui",
                            "country": "br"
                        },
                        {
                            "region": "Rio de Janeiro",
                            "country": "br"
                        },
                        {
                            "region": "Rio Grande do Norte",
                            "country": "br"
                        },
                        {
                            "region": "Rio Grande do Sul",
                            "country": "br"
                        },
                        {
                            "region": "Rondonia",
                            "country": "br"
                        },
                        {
                            "region": "Roraima",
                            "country": "br"
                        },
                        {
                            "region": "Santa Catarina",
                            "country": "br"
                        },
                        {
                            "region": "Sao Paulo",
                            "country": "br"
                        },
                        {
                            "region": "Sergipe",
                            "country": "br"
                        },
                        {
                            "region": "Tocantins",
                            "country": "br"
                        }
                    ]
                });}


                if(req.body.codecode== "bn"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Belait District",
                            "country": "bn"
                        },
                        {
                            "region": "Brunei and Muara District",
                            "country": "bn"
                        },
                        {
                            "region": "Temburong District",
                            "country": "bn"
                        },
                        {
                            "region": "Tutong District",
                            "country": "bn"
                        }
                    ]
                });}


                if(req.body.codecode== "bg"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Blagoevgrad",
                            "country": "bg"
                        },
                        {
                            "region": "Burgas",
                            "country": "bg"
                        },
                        {
                            "region": "Gabrovo",
                            "country": "bg"
                        },
                        {
                            "region": "Haskovo",
                            "country": "bg"
                        },
                        {
                            "region": "Lovech",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Dobrich",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Kardzhali",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Kyustendil",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Montana",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Pleven",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Razgrad",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Ruse",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Shumen",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Silistra",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Sliven",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Smolyan",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Stara Zagora",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Targovishte",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Veliko Tarnovo",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Vidin",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Vratsa",
                            "country": "bg"
                        },
                        {
                            "region": "Oblast Yambol",
                            "country": "bg"
                        },
                        {
                            "region": "Pazardzhik",
                            "country": "bg"
                        },
                        {
                            "region": "Pernik",
                            "country": "bg"
                        },
                        {
                            "region": "Plovdiv",
                            "country": "bg"
                        },
                        {
                            "region": "Sofia",
                            "country": "bg"
                        },
                        {
                            "region": "Sofia-Grad",
                            "country": "bg"
                        },
                        {
                            "region": "Varna",
                            "country": "bg"
                        }
                    ]
                });}


                if(req.body.codecode== "bf"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Boucle du Mouhoun Region",
                            "country": "bf"
                        },
                        {
                            "region": "Cascades Region",
                            "country": "bf"
                        },
                        {
                            "region": "Centre",
                            "country": "bf"
                        },
                        {
                            "region": "Centre-Est",
                            "country": "bf"
                        },
                        {
                            "region": "Centre-Nord",
                            "country": "bf"
                        },
                        {
                            "region": "Centre-Ouest",
                            "country": "bf"
                        },
                        {
                            "region": "Centre-Sud",
                            "country": "bf"
                        },
                        {
                            "region": "Est",
                            "country": "bf"
                        },
                        {
                            "region": "High-Basins Region",
                            "country": "bf"
                        },
                        {
                            "region": "Nord",
                            "country": "bf"
                        },
                        {
                            "region": "Plateau-Central",
                            "country": "bf"
                        },
                        {
                            "region": "Sahel",
                            "country": "bf"
                        },
                        {
                            "region": "Southwest Region",
                            "country": "bf"
                        }
                    ]
                });}


                if(req.body.codecode== "bi"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Bubanza Province",
                            "country": "bi"
                        },
                        {
                            "region": "Bujumbura Mairie Province",
                            "country": "bi"
                        },
                        {
                            "region": "Bujumbura Rural Province",
                            "country": "bi"
                        },
                        {
                            "region": "Bururi Province",
                            "country": "bi"
                        },
                        {
                            "region": "Cankuzo Province",
                            "country": "bi"
                        },
                        {
                            "region": "Cibitoke Province",
                            "country": "bi"
                        },
                        {
                            "region": "Gitega Province",
                            "country": "bi"
                        },
                        {
                            "region": "Karuzi Province",
                            "country": "bi"
                        },
                        {
                            "region": "Kayanza Province",
                            "country": "bi"
                        },
                        {
                            "region": "Kirundo Province",
                            "country": "bi"
                        },
                        {
                            "region": "Makamba Province",
                            "country": "bi"
                        },
                        {
                            "region": "Muramvya Province",
                            "country": "bi"
                        },
                        {
                            "region": "Muyinga Province",
                            "country": "bi"
                        },
                        {
                            "region": "Ngozi Province",
                            "country": "bi"
                        },
                        {
                            "region": "Province de Mwaro",
                            "country": "bi"
                        },
                        {
                            "region": "Rumonge Province",
                            "country": "bi"
                        },
                        {
                            "region": "Rutana Province",
                            "country": "bi"
                        },
                        {
                            "region": "Ruyigi Province",
                            "country": "bi"
                        }
                    ]
                });}


                if(req.body.codecode== "kh"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Banteay Meanchey",
                            "country": "kh"
                        },
                        {
                            "region": "Battambang",
                            "country": "kh"
                        },
                        {
                            "region": "Kampong Cham",
                            "country": "kh"
                        },
                        {
                            "region": "Kampong Chhnang",
                            "country": "kh"
                        },
                        {
                            "region": "Kampong Speu",
                            "country": "kh"
                        },
                        {
                            "region": "Kampong Thom",
                            "country": "kh"
                        },
                        {
                            "region": "Kampot",
                            "country": "kh"
                        },
                        {
                            "region": "Kandal",
                            "country": "kh"
                        },
                        {
                            "region": "Kep",
                            "country": "kh"
                        },
                        {
                            "region": "Koh Kong",
                            "country": "kh"
                        },
                        {
                            "region": "Kratie",
                            "country": "kh"
                        },
                        {
                            "region": "Mondolkiri",
                            "country": "kh"
                        },
                        {
                            "region": "Otar Meanchey",
                            "country": "kh"
                        },
                        {
                            "region": "Pailin",
                            "country": "kh"
                        },
                        {
                            "region": "Phnom Penh",
                            "country": "kh"
                        },
                        {
                            "region": "Preah Vihear",
                            "country": "kh"
                        },
                        {
                            "region": "Prey Veng",
                            "country": "kh"
                        },
                        {
                            "region": "Pursat",
                            "country": "kh"
                        },
                        {
                            "region": "Ratanakiri",
                            "country": "kh"
                        },
                        {
                            "region": "Siem Reap",
                            "country": "kh"
                        },
                        {
                            "region": "Sihanoukville",
                            "country": "kh"
                        },
                        {
                            "region": "Stung Treng",
                            "country": "kh"
                        },
                        {
                            "region": "Svay Rieng",
                            "country": "kh"
                        },
                        {
                            "region": "Takeo",
                            "country": "kh"
                        },
                        {
                            "region": "Tboung Khmum",
                            "country": "kh"
                        }
                    ]
                });}


                if(req.body.codecode== "cm"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Adamaoua Region",
                            "country": "cm"
                        },
                        {
                            "region": "Centre Region",
                            "country": "cm"
                        },
                        {
                            "region": "East Region",
                            "country": "cm"
                        },
                        {
                            "region": "Far North Region",
                            "country": "cm"
                        },
                        {
                            "region": "Littoral Region",
                            "country": "cm"
                        },
                        {
                            "region": "North Region",
                            "country": "cm"
                        },
                        {
                            "region": "North-West Region",
                            "country": "cm"
                        },
                        {
                            "region": "South Region",
                            "country": "cm"
                        },
                        {
                            "region": "South-West Region",
                            "country": "cm"
                        },
                        {
                            "region": "West Region",
                            "country": "cm"
                        }
                    ]
                });}


                if(req.body.codecode== "ca"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Alberta",
                            "country": "ca"
                        },
                        {
                            "region": "British Columbia",
                            "country": "ca"
                        },
                        {
                            "region": "Manitoba",
                            "country": "ca"
                        },
                        {
                            "region": "New Brunswick/Nouveau-Brunswick",
                            "country": "ca"
                        },
                        {
                            "region": "Newfoundland and Labrador",
                            "country": "ca"
                        },
                        {
                            "region": "Northwest Territories",
                            "country": "ca"
                        },
                        {
                            "region": "Nova Scotia",
                            "country": "ca"
                        },
                        {
                            "region": "Nunavut",
                            "country": "ca"
                        },
                        {
                            "region": "Ontario",
                            "country": "ca"
                        },
                        {
                            "region": "Prince Edward Island",
                            "country": "ca"
                        },
                        {
                            "region": "Quebec",
                            "country": "ca"
                        },
                        {
                            "region": "Saskatchewan",
                            "country": "ca"
                        },
                        {
                            "region": "Yukon",
                            "country": "ca"
                        }
                    ]
                });}


                if(req.body.codecode== "cv"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Concelho da Boa Vista",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho da Brava",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho da Praia",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho da Ribeira Brava",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho da Ribeira Grande",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho de Ribeira Grande de Santiago",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho de Santa Catarina",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho de Santa Catarina do Fogo",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho de Santa Cruz",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho de Sao Domingos",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho de Sao Miguel",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho de Sao Salvador do Mundo",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho de Sao Vicente",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho do Maio",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho do Paul",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho do Porto Novo",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho do Sao Filipe",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho do Tarrafal",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho do Tarrafal de Sao Nicolau",
                            "country": "cv"
                        },
                        {
                            "region": "Concelho dos Mosteiros",
                            "country": "cv"
                        },
                        {
                            "region": "Sal Municipality",
                            "country": "cv"
                        },
                        {
                            "region": "Sao Lourenco dos Orgaos",
                            "country": "cv"
                        }
                    ]
                });}


                if(req.body.codecode== "ky"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Bodden Town",
                            "country": "ky"
                        },
                        {
                            "region": "East End",
                            "country": "ky"
                        },
                        {
                            "region": "George Town",
                            "country": "ky"
                        },
                        {
                            "region": "North Side",
                            "country": "ky"
                        },
                        {
                            "region": "Sister Island",
                            "country": "ky"
                        },
                        {
                            "region": "West Bay",
                            "country": "ky"
                        }
                    ]
                });}


                if(req.body.codecode== "cf"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Bamingui-Bangoran",
                            "country": "cf"
                        },
                        {
                            "region": "Basse-Kotto",
                            "country": "cf"
                        },
                        {
                            "region": "Commune de Bangui",
                            "country": "cf"
                        },
                        {
                            "region": "Haut-Mbomou",
                            "country": "cf"
                        },
                        {
                            "region": "Haute-Kotto",
                            "country": "cf"
                        },
                        {
                            "region": "Lobaye",
                            "country": "cf"
                        },
                        {
                            "region": "Mambere-Kadei",
                            "country": "cf"
                        },
                        {
                            "region": "Mbomou",
                            "country": "cf"
                        },
                        {
                            "region": "Ombella-Mpoko",
                            "country": "cf"
                        },
                        {
                            "region": "Ouaka",
                            "country": "cf"
                        },
                        {
                            "region": "Ouham",
                            "country": "cf"
                        },
                        {
                            "region": "Prefecture de l'Ouham-Pende",
                            "country": "cf"
                        },
                        {
                            "region": "Prefecture de la Kemo",
                            "country": "cf"
                        },
                        {
                            "region": "Prefecture de la Nana-Grebizi",
                            "country": "cf"
                        },
                        {
                            "region": "Prefecture de la Nana-Mambere",
                            "country": "cf"
                        },
                        {
                            "region": "Prefecture de la Sangha-Mbaere",
                            "country": "cf"
                        },
                        {
                            "region": "Vakaga",
                            "country": "cf"
                        }
                    ]
                });}


                if(req.body.codecode== "td"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Barh el Gazel",
                            "country": "td"
                        },
                        {
                            "region": "Batha Region",
                            "country": "td"
                        },
                        {
                            "region": "Borkou Region",
                            "country": "td"
                        },
                        {
                            "region": "Chari-Baguirmi Region",
                            "country": "td"
                        },
                        {
                            "region": "Ennedi-Est",
                            "country": "td"
                        },
                        {
                            "region": "Ennedi-Ouest",
                            "country": "td"
                        },
                        {
                            "region": "Guera Region",
                            "country": "td"
                        },
                        {
                            "region": "Hadjer-Lamis",
                            "country": "td"
                        },
                        {
                            "region": "Kanem Region",
                            "country": "td"
                        },
                        {
                            "region": "Lac Region",
                            "country": "td"
                        },
                        {
                            "region": "Logone Occidental Region",
                            "country": "td"
                        },
                        {
                            "region": "Logone Oriental Region",
                            "country": "td"
                        },
                        {
                            "region": "Mandoul",
                            "country": "td"
                        },
                        {
                            "region": "Mayo-Kebbi East Region",
                            "country": "td"
                        },
                        {
                            "region": "Mayo-Kebbi West Region",
                            "country": "td"
                        },
                        {
                            "region": "Moyen-Chari Region",
                            "country": "td"
                        },
                        {
                            "region": "Ouaddai Region",
                            "country": "td"
                        },
                        {
                            "region": "Region de la Ville de N'Djamena",
                            "country": "td"
                        },
                        {
                            "region": "Salamat Region",
                            "country": "td"
                        },
                        {
                            "region": "Sila",
                            "country": "td"
                        },
                        {
                            "region": "Tandjile Region",
                            "country": "td"
                        },
                        {
                            "region": "Tibesti Region",
                            "country": "td"
                        },
                        {
                            "region": "Wadi Fira Region",
                            "country": "td"
                        }
                    ]
                });}


                if(req.body.codecode== "cl"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Antofagasta",
                            "country": "cl"
                        },
                        {
                            "region": "Atacama",
                            "country": "cl"
                        },
                        {
                            "region": "Aysen",
                            "country": "cl"
                        },
                        {
                            "region": "Coquimbo",
                            "country": "cl"
                        },
                        {
                            "region": "Los Lagos",
                            "country": "cl"
                        },
                        {
                            "region": "Maule",
                            "country": "cl"
                        },
                        {
                            "region": "Region de Arica y Parinacota",
                            "country": "cl"
                        },
                        {
                            "region": "Region de la Araucania",
                            "country": "cl"
                        },
                        {
                            "region": "Region de Los Rios",
                            "country": "cl"
                        },
                        {
                            "region": "Region de Magallanes y de la Antartica Chilena",
                            "country": "cl"
                        },
                        {
                            "region": "Region de Tarapaca",
                            "country": "cl"
                        },
                        {
                            "region": "Region de Valparaiso",
                            "country": "cl"
                        },
                        {
                            "region": "Region del Biobio",
                            "country": "cl"
                        },
                        {
                            "region": "Region del Libertador General Bernardo O'Higgins",
                            "country": "cl"
                        },
                        {
                            "region": "Region Metropolitana de Santiago",
                            "country": "cl"
                        }
                    ]
                });}


                if(req.body.codecode== "cn"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Anhui Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Beijing Shi",
                            "country": "cn"
                        },
                        {
                            "region": "Chongqing Shi",
                            "country": "cn"
                        },
                        {
                            "region": "Fujian Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Gansu Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Guangdong Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Guangxi Zhuangzu Zizhiqu",
                            "country": "cn"
                        },
                        {
                            "region": "Guizhou Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Hainan Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Hebei Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Heilongjiang Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Henan Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Hubei Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Hunan Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Inner Mongolia Autonomous Region",
                            "country": "cn"
                        },
                        {
                            "region": "Jiangsu Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Jiangxi Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Jilin Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Liaoning Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Ningxia Huizu Zizhiqu",
                            "country": "cn"
                        },
                        {
                            "region": "Qinghai Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Shaanxi",
                            "country": "cn"
                        },
                        {
                            "region": "Shandong Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Shanghai Shi",
                            "country": "cn"
                        },
                        {
                            "region": "Shanxi Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Sichuan Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Tianjin Shi",
                            "country": "cn"
                        },
                        {
                            "region": "Tibet Autonomous Region",
                            "country": "cn"
                        },
                        {
                            "region": "Xinjiang Uygur Zizhiqu",
                            "country": "cn"
                        },
                        {
                            "region": "Yunnan Sheng",
                            "country": "cn"
                        },
                        {
                            "region": "Zhejiang Sheng",
                            "country": "cn"
                        }
                    ]
                });}


                if(req.body.codecode== "cx"){return res.status(200).json({
                    statesData:[]
                });}


                if(req.body.codecode== "cc"){return res.status(200).json({
                    statesData:[]
                });}


                if(req.body.codecode== "co"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Amazonas",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Antioquia",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Arauca",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Bolivar",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Boyaca",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Caldas",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Casanare",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Cordoba",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Cundinamarca",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de La Guajira",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Narino",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Norte de Santander",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Risaralda",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Santander",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Sucre",
                            "country": "co"
                        },
                        {
                            "region": "Departamento de Tolima",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Atlantico",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Caqueta",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Cauca",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Cesar",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Choco",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Guainia",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Guaviare",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Huila",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Magdalena",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Meta",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Putumayo",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Valle del Cauca",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Vaupes",
                            "country": "co"
                        },
                        {
                            "region": "Departamento del Vichada",
                            "country": "co"
                        },
                        {
                            "region": "Distrito Capital de Bogota",
                            "country": "co"
                        },
                        {
                            "region": "Providencia y Santa Catalina, Departamento de Archipielago de San Andres",
                            "country": "co"
                        },
                        {
                            "region": "Quindio Department",
                            "country": "co"
                        }
                    ]
                });}


                if(req.body.codecode== "km"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Grande Comore",
                            "country": "km"
                        },
                        {
                            "region": "Moheli",
                            "country": "km"
                        },
                        {
                            "region": "Ndzuwani",
                            "country": "km"
                        }
                    ]
                });}


                if(req.body.codecode== "cg"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Commune de Brazzaville",
                            "country": "cg"
                        },
                        {
                            "region": "Cuvette",
                            "country": "cg"
                        },
                        {
                            "region": "Cuvette-Ouest",
                            "country": "cg"
                        },
                        {
                            "region": "Lekoumou",
                            "country": "cg"
                        },
                        {
                            "region": "Likouala",
                            "country": "cg"
                        },
                        {
                            "region": "Plateaux",
                            "country": "cg"
                        },
                        {
                            "region": "Pointe-Noire",
                            "country": "cg"
                        },
                        {
                            "region": "Pool",
                            "country": "cg"
                        },
                        {
                            "region": "Region de la Bouenza",
                            "country": "cg"
                        },
                        {
                            "region": "Region du Kouilou",
                            "country": "cg"
                        },
                        {
                            "region": "Region du Niari",
                            "country": "cg"
                        },
                        {
                            "region": "Sangha",
                            "country": "cg"
                        }
                    ]
                });}


                if(req.body.codecode== "ck"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Aitutaki",
                            "country": "ck"
                        },
                        {
                            "region": "Atiu",
                            "country": "ck"
                        },
                        {
                            "region": "Ma'uke",
                            "country": "ck"
                        },
                        {
                            "region": "Mangaia",
                            "country": "ck"
                        },
                        {
                            "region": "Manihiki",
                            "country": "ck"
                        },
                        {
                            "region": "Mitiaro",
                            "country": "ck"
                        },
                        {
                            "region": "Palmerston",
                            "country": "ck"
                        },
                        {
                            "region": "Penrhyn",
                            "country": "ck"
                        },
                        {
                            "region": "Pukapuka",
                            "country": "ck"
                        },
                        {
                            "region": "Rakahanga",
                            "country": "ck"
                        },
                        {
                            "region": "Rarotonga",
                            "country": "ck"
                        }
                    ]
                });}


                if(req.body.codecode== "cr"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Provincia de Alajuela",
                            "country": "cr"
                        },
                        {
                            "region": "Provincia de Cartago",
                            "country": "cr"
                        },
                        {
                            "region": "Provincia de Guanacaste",
                            "country": "cr"
                        },
                        {
                            "region": "Provincia de Heredia",
                            "country": "cr"
                        },
                        {
                            "region": "Provincia de Limon",
                            "country": "cr"
                        },
                        {
                            "region": "Provincia de Puntarenas",
                            "country": "cr"
                        },
                        {
                            "region": "Provincia de San Jose",
                            "country": "cr"
                        }
                    ]
                });}


                if(req.body.codecode== "ci"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Abidjan",
                            "country": "ci"
                        },
                        {
                            "region": "Bas-Sassandra",
                            "country": "ci"
                        },
                        {
                            "region": "Comoe",
                            "country": "ci"
                        },
                        {
                            "region": "Denguele",
                            "country": "ci"
                        },
                        {
                            "region": "Goh-Djiboua",
                            "country": "ci"
                        },
                        {
                            "region": "Lacs",
                            "country": "ci"
                        },
                        {
                            "region": "Lagunes",
                            "country": "ci"
                        },
                        {
                            "region": "Montagnes",
                            "country": "ci"
                        },
                        {
                            "region": "Sassandra-Marahoue",
                            "country": "ci"
                        },
                        {
                            "region": "Savanes",
                            "country": "ci"
                        },
                        {
                            "region": "Vallee du Bandama",
                            "country": "ci"
                        },
                        {
                            "region": "Woroba",
                            "country": "ci"
                        },
                        {
                            "region": "Yamoussoukro Autonomous District",
                            "country": "ci"
                        },
                        {
                            "region": "Zanzan",
                            "country": "ci"
                        }
                    ]
                });}


                if(req.body.codecode== "hr"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Bjelovarsko-Bilogorska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Brodsko-Posavska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Dubrovacko-Neretvanska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Grad Zagreb",
                            "country": "hr"
                        },
                        {
                            "region": "Istarska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Karlovacka Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Koprivnicko-Krizevacka Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Krapinsko-Zagorska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Licko-Senjska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Megimurska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Osjecko-Baranjska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Pozesko-Slavonska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Primorsko-Goranska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Sibensko-Kninska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Sisacko-Moslavacka Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Splitsko-Dalmatinska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Varazdinska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Viroviticko-Podravska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Vukovarsko-Srijemska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Zadarska Zupanija",
                            "country": "hr"
                        },
                        {
                            "region": "Zagreb County",
                            "country": "hr"
                        }
                    ]
                });}


                if(req.body.codecode== "cu"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Artemisa",
                            "country": "cu"
                        },
                        {
                            "region": "La Habana",
                            "country": "cu"
                        },
                        {
                            "region": "Las Tunas",
                            "country": "cu"
                        },
                        {
                            "region": "Municipio Especial Isla de la Juventud",
                            "country": "cu"
                        },
                        {
                            "region": "Provincia de Camagueey",
                            "country": "cu"
                        },
                        {
                            "region": "Provincia de Ciego de Avila",
                            "country": "cu"
                        },
                        {
                            "region": "Provincia de Cienfuegos",
                            "country": "cu"
                        },
                        {
                            "region": "Provincia de Guantanamo",
                            "country": "cu"
                        },
                        {
                            "region": "Provincia de Holguin",
                            "country": "cu"
                        },
                        {
                            "region": "Provincia de Matanzas",
                            "country": "cu"
                        },
                        {
                            "region": "Provincia de Pinar del Rio",
                            "country": "cu"
                        },
                        {
                            "region": "Provincia de Sancti Spiritus",
                            "country": "cu"
                        },
                        {
                            "region": "Provincia de Santiago de Cuba",
                            "country": "cu"
                        },
                        {
                            "region": "Provincia de Villa Clara",
                            "country": "cu"
                        },
                        {
                            "region": "Provincia Granma",
                            "country": "cu"
                        },
                        {
                            "region": "Provincia Mayabeque",
                            "country": "cu"
                        }
                    ]
                });}


                if(req.body.codecode== "cy"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Eparchia Ammochostou",
                            "country": "cy"
                        },
                        {
                            "region": "Eparchia Keryneias",
                            "country": "cy"
                        },
                        {
                            "region": "Eparchia Larnakas",
                            "country": "cy"
                        },
                        {
                            "region": "Eparchia Lefkosias",
                            "country": "cy"
                        },
                        {
                            "region": "Eparchia Lemesou",
                            "country": "cy"
                        },
                        {
                            "region": "Eparchia Pafou",
                            "country": "cy"
                        }
                    ]
                });}


                if(req.body.codecode== "cz"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Hlavni mesto Praha",
                            "country": "cz"
                        },
                        {
                            "region": "Jihocesky kraj",
                            "country": "cz"
                        },
                        {
                            "region": "Jihomoravsky kraj",
                            "country": "cz"
                        },
                        {
                            "region": "Karlovarsky kraj",
                            "country": "cz"
                        },
                        {
                            "region": "Kraj Vysocina",
                            "country": "cz"
                        },
                        {
                            "region": "Kralovehradecky kraj",
                            "country": "cz"
                        },
                        {
                            "region": "Liberecky kraj",
                            "country": "cz"
                        },
                        {
                            "region": "Moravskoslezsky kraj",
                            "country": "cz"
                        },
                        {
                            "region": "Olomoucky kraj",
                            "country": "cz"
                        },
                        {
                            "region": "Pardubicky kraj",
                            "country": "cz"
                        },
                        {
                            "region": "Plzensky kraj",
                            "country": "cz"
                        },
                        {
                            "region": "Stredocesky kraj",
                            "country": "cz"
                        },
                        {
                            "region": "Ustecky kraj",
                            "country": "cz"
                        },
                        {
                            "region": "Zlinsky kraj",
                            "country": "cz"
                        }
                    ]
                });}


                if(req.body.codecode== "cd"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Bas Uele",
                            "country": "cd"
                        },
                        {
                            "region": "Haut Uele",
                            "country": "cd"
                        },
                        {
                            "region": "Haut-Lomani",
                            "country": "cd"
                        },
                        {
                            "region": "Ituri",
                            "country": "cd"
                        },
                        {
                            "region": "Kasai District",
                            "country": "cd"
                        },
                        {
                            "region": "Kasai-Central",
                            "country": "cd"
                        },
                        {
                            "region": "Kinshasa City",
                            "country": "cd"
                        },
                        {
                            "region": "Kwango",
                            "country": "cd"
                        },
                        {
                            "region": "Kwilu",
                            "country": "cd"
                        },
                        {
                            "region": "Lomami",
                            "country": "cd"
                        },
                        {
                            "region": "Lualaba",
                            "country": "cd"
                        },
                        {
                            "region": "Mai Ndombe",
                            "country": "cd"
                        },
                        {
                            "region": "Mongala",
                            "country": "cd"
                        },
                        {
                            "region": "Province de l'Equateur",
                            "country": "cd"
                        },
                        {
                            "region": "Province du Haut-Katanga",
                            "country": "cd"
                        },
                        {
                            "region": "Province du Kasai Oriental",
                            "country": "cd"
                        },
                        {
                            "region": "Province du Kongo Central",
                            "country": "cd"
                        },
                        {
                            "region": "Province du Maniema",
                            "country": "cd"
                        },
                        {
                            "region": "Province du Nord-Kivu",
                            "country": "cd"
                        },
                        {
                            "region": "Province du Nord-Ubangi",
                            "country": "cd"
                        },
                        {
                            "region": "Province du Sud-Ubangi",
                            "country": "cd"
                        },
                        {
                            "region": "Sankuru",
                            "country": "cd"
                        },
                        {
                            "region": "South Kivu Province",
                            "country": "cd"
                        },
                        {
                            "region": "Tanganika",
                            "country": "cd"
                        },
                        {
                            "region": "Tshopo",
                            "country": "cd"
                        },
                        {
                            "region": "Tshuapa",
                            "country": "cd"
                        }
                    ]
                });}


                if(req.body.codecode== "dk"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "North Denmark Region",
                            "country": "dk"
                        },
                        {
                            "region": "Region Hovedstaden",
                            "country": "dk"
                        },
                        {
                            "region": "Region Midtjylland",
                            "country": "dk"
                        },
                        {
                            "region": "Region Sjaelland",
                            "country": "dk"
                        },
                        {
                            "region": "Region Syddanmark",
                            "country": "dk"
                        }
                    ]
                });}


                if(req.body.codecode== "dj"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Ali Sabieh Region",
                            "country": "dj"
                        },
                        {
                            "region": "Arta Region",
                            "country": "dj"
                        },
                        {
                            "region": "Dikhil",
                            "country": "dj"
                        },
                        {
                            "region": "Djibouti Region",
                            "country": "dj"
                        },
                        {
                            "region": "Obock",
                            "country": "dj"
                        },
                        {
                            "region": "Tadjourah",
                            "country": "dj"
                        }
                    ]
                });}


                if(req.body.codecode== "dm"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Saint Andrew",
                            "country": "dm"
                        },
                        {
                            "region": "Saint David",
                            "country": "dm"
                        },
                        {
                            "region": "Saint George",
                            "country": "dm"
                        },
                        {
                            "region": "Saint John",
                            "country": "dm"
                        },
                        {
                            "region": "Saint Joseph",
                            "country": "dm"
                        },
                        {
                            "region": "Saint Luke",
                            "country": "dm"
                        },
                        {
                            "region": "Saint Mark",
                            "country": "dm"
                        },
                        {
                            "region": "Saint Patrick",
                            "country": "dm"
                        },
                        {
                            "region": "Saint Paul",
                            "country": "dm"
                        },
                        {
                            "region": "Saint Peter",
                            "country": "dm"
                        }
                    ]
                });}


                if(req.body.codecode== "do"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Distrito Nacional",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Azua",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Baoruco",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Barahona",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Dajabon",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de El Seibo",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Elias Pina",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Hato Mayor",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Hermanas Mirabal",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Independencia",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de La Altagracia",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de La Romana",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de La Vega",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Monsenor Nouel",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Monte Cristi",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Monte Plata",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Pedernales",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Peravia",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Puerto Plata",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de San Cristobal",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de San Jose de Ocoa",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de San Juan",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de San Pedro de Macoris",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Santiago",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Santiago Rodriguez",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Santo Domingo",
                            "country": "do"
                        },
                        {
                            "region": "Provincia de Valverde",
                            "country": "do"
                        },
                        {
                            "region": "Provincia Duarte",
                            "country": "do"
                        },
                        {
                            "region": "Provincia Espaillat",
                            "country": "do"
                        },
                        {
                            "region": "Provincia Maria Trinidad Sanchez",
                            "country": "do"
                        },
                        {
                            "region": "Provincia Sanchez Ramirez",
                            "country": "do"
                        },
                        {
                            "region": "Samana Province",
                            "country": "do"
                        }
                    ]
                });}


                if(req.body.codecode== "ec"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Provincia de Bolivar",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Cotopaxi",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de El Oro",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Esmeraldas",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Francisco de Orellana",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Galapagos",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Imbabura",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Loja",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Los Rios",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Manabi",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Morona-Santiago",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Napo",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Pichincha",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Santa Elena",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Santo Domingo de los Tsachilas",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Sucumbios",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia de Zamora-Chinchipe",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia del Azuay",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia del Canar",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia del Carchi",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia del Chimborazo",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia del Guayas",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia del Pastaza",
                            "country": "ec"
                        },
                        {
                            "region": "Provincia del Tungurahua",
                            "country": "ec"
                        }
                    ]
                });}


                if(req.body.codecode== "eg"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "As Suways",
                            "country": "eg"
                        },
                        {
                            "region": "Beheira Governorate",
                            "country": "eg"
                        },
                        {
                            "region": "Cairo Governorate",
                            "country": "eg"
                        },
                        {
                            "region": "Damietta Governorate",
                            "country": "eg"
                        },
                        {
                            "region": "Ismailia Governorate",
                            "country": "eg"
                        },
                        {
                            "region": "Kafr ash Shaykh",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat ad Daqahliyah",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat al Fayyum",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat al Gharbiyah",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat al Iskandariyah",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat al Jizah",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat al Minufiyah",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat al Minya",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat al Qalyubiyah",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat al Uqsur",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat al Wadi al Jadid",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat ash Sharqiyah",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat Aswan",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat Asyut",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat Bani Suwayf",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat Bur Sa'id",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat Matruh",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat Qina",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat Shamal Sina'",
                            "country": "eg"
                        },
                        {
                            "region": "Muhafazat Suhaj",
                            "country": "eg"
                        },
                        {
                            "region": "Red Sea Governorate",
                            "country": "eg"
                        },
                        {
                            "region": "South Sinai Governorate",
                            "country": "eg"
                        }
                    ]
                });}


                if(req.body.codecode== "sv"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Departamento de Ahuachapan",
                            "country": "sv"
                        },
                        {
                            "region": "Departamento de Cabanas",
                            "country": "sv"
                        },
                        {
                            "region": "Departamento de Chalatenango",
                            "country": "sv"
                        },
                        {
                            "region": "Departamento de Cuscatlan",
                            "country": "sv"
                        },
                        {
                            "region": "Departamento de La Libertad",
                            "country": "sv"
                        },
                        {
                            "region": "Departamento de La Paz",
                            "country": "sv"
                        },
                        {
                            "region": "Departamento de La Union",
                            "country": "sv"
                        },
                        {
                            "region": "Departamento de Morazan",
                            "country": "sv"
                        },
                        {
                            "region": "Departamento de San Miguel",
                            "country": "sv"
                        },
                        {
                            "region": "Departamento de San Salvador",
                            "country": "sv"
                        },
                        {
                            "region": "Departamento de San Vicente",
                            "country": "sv"
                        },
                        {
                            "region": "Departamento de Santa Ana",
                            "country": "sv"
                        },
                        {
                            "region": "Departamento de Sonsonate",
                            "country": "sv"
                        },
                        {
                            "region": "Departamento de Usulutan",
                            "country": "sv"
                        }
                    ]
                });}


                if(req.body.codecode== "gq"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Provincia de Annobon",
                            "country": "gq"
                        },
                        {
                            "region": "Provincia de Bioko Norte",
                            "country": "gq"
                        },
                        {
                            "region": "Provincia de Bioko Sur",
                            "country": "gq"
                        },
                        {
                            "region": "Provincia de Centro Sur",
                            "country": "gq"
                        },
                        {
                            "region": "Provincia de Kie-Ntem",
                            "country": "gq"
                        },
                        {
                            "region": "Provincia de Litoral",
                            "country": "gq"
                        },
                        {
                            "region": "Provincia de Wele-Nzas",
                            "country": "gq"
                        }
                    ]
                });}


                if(req.body.codecode== "er"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Anseba Region",
                            "country": "er"
                        },
                        {
                            "region": "Debub Region",
                            "country": "er"
                        },
                        {
                            "region": "Gash-Barka Region",
                            "country": "er"
                        },
                        {
                            "region": "Maekel Region",
                            "country": "er"
                        },
                        {
                            "region": "Northern Red Sea Region",
                            "country": "er"
                        },
                        {
                            "region": "Southern Red Sea Region",
                            "country": "er"
                        }
                    ]
                });}


                if(req.body.codecode== "ee"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Harjumaa",
                            "country": "ee"
                        },
                        {
                            "region": "Hiiumaa",
                            "country": "ee"
                        },
                        {
                            "region": "Ida-Virumaa",
                            "country": "ee"
                        },
                        {
                            "region": "Jarvamaa",
                            "country": "ee"
                        },
                        {
                            "region": "Jogevamaa",
                            "country": "ee"
                        },
                        {
                            "region": "Laane-Virumaa",
                            "country": "ee"
                        },
                        {
                            "region": "Laeaenemaa",
                            "country": "ee"
                        },
                        {
                            "region": "Paernumaa",
                            "country": "ee"
                        },
                        {
                            "region": "Polvamaa",
                            "country": "ee"
                        },
                        {
                            "region": "Raplamaa",
                            "country": "ee"
                        },
                        {
                            "region": "Saaremaa",
                            "country": "ee"
                        },
                        {
                            "region": "Tartumaa",
                            "country": "ee"
                        },
                        {
                            "region": "Valgamaa",
                            "country": "ee"
                        },
                        {
                            "region": "Viljandimaa",
                            "country": "ee"
                        },
                        {
                            "region": "Vorumaa",
                            "country": "ee"
                        }
                    ]
                });}


                if(req.body.codecode== "et"){return res.status(200).json({
                    statesData:[
                        {
                            "region": "Adis Abeba Astedader",
                            "country": "et"
                        },
                        {
                            "region": "Afar Region",
                            "country": "et"
                        },
                        {
                            "region": "Amhara Region",
                            "country": "et"
                        },
                        {
                            "region": "Benishangul-Gumuz Region",
                            "country": "et"
                        },
                        {
                            "region": "Dire Dawa Region",
                            "country": "et"
                        },
                        {
                            "region": "Gambela Region",
                            "country": "et"
                        },
                        {
                            "region": "Harari Region",
                            "country": "et"
                        },
                        {
                            "region": "Oromiya Region",
                            "country": "et"
                        },
                        {
                            "region": "Somali Region",
                            "country": "et"
                        },
                        {
                            "region": "Southern Nations, Nationalities, and People's Region",
                            "country": "et"
                        },
                        {
                            "region": "Tigray Region",
                            "country": "et"
                        }
                    ]
                });}


                if(req.body.codecode== "fk"){return res.status(200).json({
                    statesData:[]
                });}


                if(req.body.codecode== "fo"){return res.status(200).json({
statesData:[
    {
        "region": "Eysturoyar sysla",
        "country": "fo"
    },
    {
        "region": "Nordoyar sysla",
        "country": "fo"
    },
    {
        "region": "Sandoyar Sysla",
        "country": "fo"
    },
    {
        "region": "Streymoyar Sysla",
        "country": "fo"
    },
    {
        "region": "Suduroyar sysla",
        "country": "fo"
    },
    {
        "region": "Vaga Sysla",
        "country": "fo"
    }
]
                    });}


                if(req.body.codecode== "fm"){return res.status(200).json({
statesData:[
    {
        "region": "State of Chuuk",
        "country": "fm"
    },
    {
        "region": "State of Kosrae",
        "country": "fm"
    },
    {
        "region": "State of Pohnpei",
        "country": "fm"
    },
    {
        "region": "State of Yap",
        "country": "fm"
    }
]
                    });}


                if(req.body.codecode== "fj"){return res.status(200).json({
statesData:[
    {
        "region": "Central Division",
        "country": "fj"
    },
    {
        "region": "Eastern Division",
        "country": "fj"
    },
    {
        "region": "Northern Division",
        "country": "fj"
    },
    {
        "region": "Rotuma",
        "country": "fj"
    },
    {
        "region": "Western Division",
        "country": "fj"
    }
]
                    });}


                if(req.body.codecode== "fi"){return res.status(200).json({
statesData:[
    {
        "region": "Etela-Pohjanmaa",
        "country": "fi"
    },
    {
        "region": "Etelae-Karjala",
        "country": "fi"
    },
    {
        "region": "Kainuu",
        "country": "fi"
    },
    {
        "region": "Kanta-Haeme",
        "country": "fi"
    },
    {
        "region": "Keski-Pohjanmaa",
        "country": "fi"
    },
    {
        "region": "Keski-Suomi",
        "country": "fi"
    },
    {
        "region": "Kymenlaakso",
        "country": "fi"
    },
    {
        "region": "Lapland",
        "country": "fi"
    },
    {
        "region": "Paijanne-Tavastland",
        "country": "fi"
    },
    {
        "region": "Pirkanmaa",
        "country": "fi"
    },
    {
        "region": "Pohjanmaa",
        "country": "fi"
    },
    {
        "region": "Pohjois-Karjala",
        "country": "fi"
    },
    {
        "region": "Pohjois-Pohjanmaa",
        "country": "fi"
    },
    {
        "region": "Pohjois-Savo",
        "country": "fi"
    },
    {
        "region": "Satakunta",
        "country": "fi"
    },
    {
        "region": "Southern Savonia",
        "country": "fi"
    },
    {
        "region": "Uusimaa",
        "country": "fi"
    },
    {
        "region": "Varsinais-Suomi",
        "country": "fi"
    }
]
                    });}


                if(req.body.codecode== "fr"){return res.status(200).json({
statesData:[
    {
        "region": "Auvergne-Rhone-Alpes",
        "country": "fr"
    },
    {
        "region": "Bourgogne-Franche-Comte",
        "country": "fr"
    },
    {
        "region": "Bretagne",
        "country": "fr"
    },
    {
        "region": "Centre-Val de Loire",
        "country": "fr"
    },
    {
        "region": "Corse",
        "country": "fr"
    },
    {
        "region": "Grand-Est",
        "country": "fr"
    },
    {
        "region": "Hauts-de-France",
        "country": "fr"
    },
    {
        "region": "Ile-de-France",
        "country": "fr"
    },
    {
        "region": "Normandy",
        "country": "fr"
    },
    {
        "region": "Nouvelle-Aquitaine",
        "country": "fr"
    },
    {
        "region": "Occitanie",
        "country": "fr"
    },
    {
        "region": "Pays de la Loire",
        "country": "fr"
    },
    {
        "region": "Provence-Alpes-Cote d'Azur",
        "country": "fr"
    }
]
                    });}


                if(req.body.codecode== "gf"){return res.status(200).json({
statesData:[
    {
        "region": "Guyane",
        "country": "gf"
    }
]
                    });}


                if(req.body.codecode== "pf"){return res.status(200).json({
statesData:[
    {
        "region": "Iles Australes",
        "country": "pf"
    },
    {
        "region": "Iles du Vent",
        "country": "pf"
    },
    {
        "region": "Iles Marquises",
        "country": "pf"
    },
    {
        "region": "Iles Sous-le-Vent",
        "country": "pf"
    },
    {
        "region": "Iles Tuamotu-Gambier",
        "country": "pf"
    }
]
                    });}


                if(req.body.codecode== "tf"){return res.status(200).json({
statesData:[
    {
        "region": "Archipel des Crozet",
        "country": "tf"
    },
    {
        "region": "Archipel des Kerguelen",
        "country": "tf"
    },
    {
        "region": "Iles Eparses de l'ocean Indien",
        "country": "tf"
    },
    {
        "region": "Iles Saint-Paul et Nouvelle-Amsterdam",
        "country": "tf"
    },
    {
        "region": "La Terre-Adelie",
        "country": "tf"
    }
]
                    });}


                if(req.body.codecode== "ga"){return res.status(200).json({
statesData:[
    {
        "region": "Estuaire",
        "country": "ga"
    },
    {
        "region": "Province de l'Ogooue-Ivindo",
        "country": "ga"
    },
    {
        "region": "Province de l'Ogooue-Lolo",
        "country": "ga"
    },
    {
        "region": "Province de l'Ogooue-Maritime",
        "country": "ga"
    },
    {
        "region": "Province de la Ngounie",
        "country": "ga"
    },
    {
        "region": "Province de la Nyanga",
        "country": "ga"
    },
    {
        "region": "Province du Haut-Ogooue",
        "country": "ga"
    },
    {
        "region": "Province du Moyen-Ogooue",
        "country": "ga"
    },
    {
        "region": "Province du Woleu-Ntem",
        "country": "ga"
    }
]
                    });}


                if(req.body.codecode== "gm"){return res.status(200).json({
statesData:[
    {
        "region": "Banjul",
        "country": "gm"
    },
    {
        "region": "Central River",
        "country": "gm"
    },
    {
        "region": "Lower River Division",
        "country": "gm"
    },
    {
        "region": "North Bank",
        "country": "gm"
    },
    {
        "region": "Upper River",
        "country": "gm"
    },
    {
        "region": "West Coast",
        "country": "gm"
    }
]
                    });}


                if(req.body.codecode== "ge"){return res.status(200).json({
statesData:[
    {
        "region": "Abkhazia",
        "country": "ge"
    },
    {
        "region": "Ajaria",
        "country": "ge"
    },
    {
        "region": "Guria",
        "country": "ge"
    },
    {
        "region": "Imereti",
        "country": "ge"
    },
    {
        "region": "K'alak'i T'bilisi",
        "country": "ge"
    },
    {
        "region": "Kakheti",
        "country": "ge"
    },
    {
        "region": "Kvemo Kartli",
        "country": "ge"
    },
    {
        "region": "Mtskheta-Mtianeti",
        "country": "ge"
    },
    {
        "region": "Racha-Lechkhumi and Kvemo Svaneti",
        "country": "ge"
    },
    {
        "region": "Samegrelo-Zemo Svanetis Mkhare",
        "country": "ge"
    },
    {
        "region": "Samtskhe-Javakheti",
        "country": "ge"
    },
    {
        "region": "Shida Kartli",
        "country": "ge"
    }
]
                    });}


                if(req.body.codecode== "de"){return res.status(200).json({
statesData:[
    {
        "region": "Baden-Wuerttemberg Region",
        "country": "de"
    },
    {
        "region": "Bavaria",
        "country": "de"
    },
    {
        "region": "Brandenburg",
        "country": "de"
    },
    {
        "region": "Bremen",
        "country": "de"
    },
    {
        "region": "Free and Hanseatic City of Hamburg",
        "country": "de"
    },
    {
        "region": "Hessen",
        "country": "de"
    },
    {
        "region": "Land Berlin",
        "country": "de"
    },
    {
        "region": "Lower Saxony",
        "country": "de"
    },
    {
        "region": "Mecklenburg-Western Pomerania",
        "country": "de"
    },
    {
        "region": "Nordrhein-Westfalen",
        "country": "de"
    },
    {
        "region": "Rheinland-Pfalz",
        "country": "de"
    },
    {
        "region": "Saarland",
        "country": "de"
    },
    {
        "region": "Saxony",
        "country": "de"
    },
    {
        "region": "Saxony-Anhalt",
        "country": "de"
    },
    {
        "region": "Schleswig-Holstein",
        "country": "de"
    },
    {
        "region": "Thuringia",
        "country": "de"
    }
]
                    });}


                if(req.body.codecode== "gh"){return res.status(200).json({
statesData:[
    {
        "region": "Ashanti Region",
        "country": "gh"
    },
    {
        "region": "Brong-Ahafo Region",
        "country": "gh"
    },
    {
        "region": "Central Region",
        "country": "gh"
    },
    {
        "region": "Eastern Region",
        "country": "gh"
    },
    {
        "region": "Greater Accra Region",
        "country": "gh"
    },
    {
        "region": "Northern Region",
        "country": "gh"
    },
    {
        "region": "Upper East Region",
        "country": "gh"
    },
    {
        "region": "Upper West Region",
        "country": "gh"
    },
    {
        "region": "Volta Region",
        "country": "gh"
    },
    {
        "region": "Western Region",
        "country": "gh"
    }
]
                    });}


                if(req.body.codecode== "gi"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "gb"){return res.status(200).json({
statesData:[
    {
        "region": "England",
        "country": "gb"
    },
    {
        "region": "Northern Ireland",
        "country": "gb"
    },
    {
        "region": "Scotland",
        "country": "gb"
    },
    {
        "region": "Wales",
        "country": "gb"
    }
]
                    });}


                if(req.body.codecode== "gr"){return res.status(200).json({
statesData:[
    {
        "region": "Attica",
        "country": "gr"
    },
    {
        "region": "Central Greece",
        "country": "gr"
    },
    {
        "region": "Central Macedonia",
        "country": "gr"
    },
    {
        "region": "Crete",
        "country": "gr"
    },
    {
        "region": "Eastern Macedonia and Thrace",
        "country": "gr"
    },
    {
        "region": "Epirus",
        "country": "gr"
    },
    {
        "region": "Ionian Islands",
        "country": "gr"
    },
    {
        "region": "Mount Athos",
        "country": "gr"
    },
    {
        "region": "North Aegean",
        "country": "gr"
    },
    {
        "region": "Peloponnese",
        "country": "gr"
    },
    {
        "region": "South Aegean",
        "country": "gr"
    },
    {
        "region": "Thessaly",
        "country": "gr"
    },
    {
        "region": "Western Greece",
        "country": "gr"
    },
    {
        "region": "Western Macedonia",
        "country": "gr"
    }
]
                    });}


                if(req.body.codecode== "gl"){return res.status(200).json({
statesData:[
    {
        "region": "Kujalleq",
        "country": "gl"
    },
    {
        "region": "Qaasuitsup",
        "country": "gl"
    },
    {
        "region": "Qeqqata",
        "country": "gl"
    },
    {
        "region": "Sermersooq",
        "country": "gl"
    }
]
                    });}


                if(req.body.codecode== "gd"){return res.status(200).json({
statesData:[
    {
        "region": "Carriacou and Petite Martinique",
        "country": "gd"
    },
    {
        "region": "Saint Andrew",
        "country": "gd"
    },
    {
        "region": "Saint David",
        "country": "gd"
    },
    {
        "region": "Saint George",
        "country": "gd"
    },
    {
        "region": "Saint John",
        "country": "gd"
    },
    {
        "region": "Saint Mark",
        "country": "gd"
    },
    {
        "region": "Saint Patrick",
        "country": "gd"
    }
]
                    });}


                if(req.body.codecode== "gp"){return res.status(200).json({
statesData:[
    {
        "region": "Guadeloupe",
        "country": "gp"
    }
]
                    });}


                if(req.body.codecode== "gt"){return res.status(200).json({
statesData:[
    {
        "region": "Departamento de Alta Verapaz",
        "country": "gt"
    },
    {
        "region": "Departamento de Baja Verapaz",
        "country": "gt"
    },
    {
        "region": "Departamento de Chimaltenango",
        "country": "gt"
    },
    {
        "region": "Departamento de Chiquimula",
        "country": "gt"
    },
    {
        "region": "Departamento de El Progreso",
        "country": "gt"
    },
    {
        "region": "Departamento de Escuintla",
        "country": "gt"
    },
    {
        "region": "Departamento de Guatemala",
        "country": "gt"
    },
    {
        "region": "Departamento de Huehuetenango",
        "country": "gt"
    },
    {
        "region": "Departamento de Izabal",
        "country": "gt"
    },
    {
        "region": "Departamento de Jalapa",
        "country": "gt"
    },
    {
        "region": "Departamento de Jutiapa",
        "country": "gt"
    },
    {
        "region": "Departamento de Quetzaltenango",
        "country": "gt"
    },
    {
        "region": "Departamento de Retalhuleu",
        "country": "gt"
    },
    {
        "region": "Departamento de Sacatepequez",
        "country": "gt"
    },
    {
        "region": "Departamento de San Marcos",
        "country": "gt"
    },
    {
        "region": "Departamento de Santa Rosa",
        "country": "gt"
    },
    {
        "region": "Departamento de Solola",
        "country": "gt"
    },
    {
        "region": "Departamento de Suchitepequez",
        "country": "gt"
    },
    {
        "region": "Departamento de Totonicapan",
        "country": "gt"
    },
    {
        "region": "Departamento de Zacapa",
        "country": "gt"
    },
    {
        "region": "Departamento del Peten",
        "country": "gt"
    },
    {
        "region": "Departamento del Quiche",
        "country": "gt"
    }
]
                    });}


                if(req.body.codecode== "gn"){return res.status(200).json({
statesData:[
    {
        "region": "Boke Region",
        "country": "gn"
    },
    {
        "region": "Conakry Region",
        "country": "gn"
    },
    {
        "region": "Faranah Region",
        "country": "gn"
    },
    {
        "region": "Kankan Region",
        "country": "gn"
    },
    {
        "region": "Kindia Region",
        "country": "gn"
    },
    {
        "region": "Labe Region",
        "country": "gn"
    },
    {
        "region": "Mamou Region",
        "country": "gn"
    },
    {
        "region": "Nzerekore Region",
        "country": "gn"
    }
]
                    });}


                if(req.body.codecode== "gw"){return res.status(200).json({
statesData:[
    {
        "region": "Bafata",
        "country": "gw"
    },
    {
        "region": "Biombo",
        "country": "gw"
    },
    {
        "region": "Bissau Region",
        "country": "gw"
    },
    {
        "region": "Bolama",
        "country": "gw"
    },
    {
        "region": "Cacheu Region",
        "country": "gw"
    },
    {
        "region": "Gabu",
        "country": "gw"
    },
    {
        "region": "Oio Region",
        "country": "gw"
    },
    {
        "region": "Quinara",
        "country": "gw"
    },
    {
        "region": "Tombali",
        "country": "gw"
    }
]
                    });}


                if(req.body.codecode== "gy"){return res.status(200).json({
statesData:[
    {
        "region": "Barima-Waini Region",
        "country": "gy"
    },
    {
        "region": "Cuyuni-Mazaruni Region",
        "country": "gy"
    },
    {
        "region": "Demerara-Mahaica Region",
        "country": "gy"
    },
    {
        "region": "East Berbice-Corentyne Region",
        "country": "gy"
    },
    {
        "region": "Essequibo Islands-West Demerara Region",
        "country": "gy"
    },
    {
        "region": "Mahaica-Berbice Region",
        "country": "gy"
    },
    {
        "region": "Pomeroon-Supenaam Region",
        "country": "gy"
    },
    {
        "region": "Potaro-Siparuni Region",
        "country": "gy"
    },
    {
        "region": "Upper Demerara-Berbice Region",
        "country": "gy"
    },
    {
        "region": "Upper Takutu-Upper Essequibo Region",
        "country": "gy"
    }
]
                    });}


                if(req.body.codecode== "ht"){return res.status(200).json({
statesData:[
    {
        "region": "Centre",
        "country": "ht"
    },
    {
        "region": "Departement de l'Artibonite",
        "country": "ht"
    },
    {
        "region": "Departement de l'Ouest",
        "country": "ht"
    },
    {
        "region": "Departement de Nippes",
        "country": "ht"
    },
    {
        "region": "Departement du Nord-Est",
        "country": "ht"
    },
    {
        "region": "Grandans",
        "country": "ht"
    },
    {
        "region": "Nord",
        "country": "ht"
    },
    {
        "region": "Nord-Ouest",
        "country": "ht"
    },
    {
        "region": "Sud",
        "country": "ht"
    },
    {
        "region": "Sud-Est",
        "country": "ht"
    }
]
                    });}


                if(req.body.codecode== "hn"){return res.status(200).json({
statesData:[
    {
        "region": "Departamento de Atlantida",
        "country": "hn"
    },
    {
        "region": "Departamento de Choluteca",
        "country": "hn"
    },
    {
        "region": "Departamento de Colon",
        "country": "hn"
    },
    {
        "region": "Departamento de Comayagua",
        "country": "hn"
    },
    {
        "region": "Departamento de Copan",
        "country": "hn"
    },
    {
        "region": "Departamento de Cortes",
        "country": "hn"
    },
    {
        "region": "Departamento de El Paraiso",
        "country": "hn"
    },
    {
        "region": "Departamento de Francisco Morazan",
        "country": "hn"
    },
    {
        "region": "Departamento de Gracias a Dios",
        "country": "hn"
    },
    {
        "region": "Departamento de Intibuca",
        "country": "hn"
    },
    {
        "region": "Departamento de Islas de la Bahia",
        "country": "hn"
    },
    {
        "region": "Departamento de La Paz",
        "country": "hn"
    },
    {
        "region": "Departamento de Lempira",
        "country": "hn"
    },
    {
        "region": "Departamento de Ocotepeque",
        "country": "hn"
    },
    {
        "region": "Departamento de Olancho",
        "country": "hn"
    },
    {
        "region": "Departamento de Santa Barbara",
        "country": "hn"
    },
    {
        "region": "Departamento de Valle",
        "country": "hn"
    },
    {
        "region": "Departamento de Yoro",
        "country": "hn"
    }
]
                    });}


                if(req.body.codecode== "hk"){return res.status(200).json({
statesData:[
    {
        "region": "Central and Western District",
        "country": "hk"
    },
    {
        "region": "Eastern",
        "country": "hk"
    },
    {
        "region": "Islands District",
        "country": "hk"
    },
    {
        "region": "Kowloon City",
        "country": "hk"
    },
    {
        "region": "Kwai Tsing",
        "country": "hk"
    },
    {
        "region": "Kwun Tong",
        "country": "hk"
    },
    {
        "region": "North",
        "country": "hk"
    },
    {
        "region": "Sai Kung District",
        "country": "hk"
    },
    {
        "region": "Sha Tin",
        "country": "hk"
    },
    {
        "region": "Sham Shui Po",
        "country": "hk"
    },
    {
        "region": "Southern",
        "country": "hk"
    },
    {
        "region": "Tai Po District",
        "country": "hk"
    },
    {
        "region": "Tsuen Wan District",
        "country": "hk"
    },
    {
        "region": "Tuen Mun",
        "country": "hk"
    },
    {
        "region": "Wan Chai",
        "country": "hk"
    },
    {
        "region": "Wong Tai Sin",
        "country": "hk"
    },
    {
        "region": "Yau Tsim Mong",
        "country": "hk"
    },
    {
        "region": "Yuen Long District",
        "country": "hk"
    }
]
                    });}


                if(req.body.codecode== "hu"){return res.status(200).json({
statesData:[
    {
        "region": "Bacs-Kiskun county",
        "country": "hu"
    },
    {
        "region": "Baranya county",
        "country": "hu"
    },
    {
        "region": "Bekes County",
        "country": "hu"
    },
    {
        "region": "Borsod-Abauj Zemplen county",
        "country": "hu"
    },
    {
        "region": "Budapest",
        "country": "hu"
    },
    {
        "region": "Csongrad megye",
        "country": "hu"
    },
    {
        "region": "Fejer megye",
        "country": "hu"
    },
    {
        "region": "Gyor-Moson-Sopron megye",
        "country": "hu"
    },
    {
        "region": "Hajdu-Bihar",
        "country": "hu"
    },
    {
        "region": "Heves megye",
        "country": "hu"
    },
    {
        "region": "Jasz-Nagykun-Szolnok",
        "country": "hu"
    },
    {
        "region": "Komarom-Esztergom",
        "country": "hu"
    },
    {
        "region": "Nograd megye",
        "country": "hu"
    },
    {
        "region": "Pest megye",
        "country": "hu"
    },
    {
        "region": "Somogy megye",
        "country": "hu"
    },
    {
        "region": "Szabolcs-Szatmar-Bereg",
        "country": "hu"
    },
    {
        "region": "Tolna megye",
        "country": "hu"
    },
    {
        "region": "Vas megye",
        "country": "hu"
    },
    {
        "region": "Veszprem megye",
        "country": "hu"
    },
    {
        "region": "Zala megye",
        "country": "hu"
    }
]
                    });}


                if(req.body.codecode== "is"){return res.status(200).json({
statesData:[
    {
        "region": "Austurland",
        "country": "is"
    },
    {
        "region": "Hoefudborgarsvaedi",
        "country": "is"
    },
    {
        "region": "Nordurland Eystra",
        "country": "is"
    },
    {
        "region": "Nordurland Vestra",
        "country": "is"
    },
    {
        "region": "Sudurland",
        "country": "is"
    },
    {
        "region": "Sudurnes",
        "country": "is"
    },
    {
        "region": "Vestfirdir",
        "country": "is"
    },
    {
        "region": "Vesturland",
        "country": "is"
    }
]
                    });}


                if(req.body.codecode== "in"){return res.status(200).json({
statesData:[
    {
        "region": "Assam",
        "country": "in"
    },
    {
        "region": "Goa",
        "country": "in"
    },
    {
        "region": "Madhya Pradesh",
        "country": "in"
    },
    {
        "region": "Manipur",
        "country": "in"
    },
    {
        "region": "Meghalaya",
        "country": "in"
    },
    {
        "region": "Mizoram",
        "country": "in"
    },
    {
        "region": "National Capital Territory of Delhi",
        "country": "in"
    },
    {
        "region": "Sikkim",
        "country": "in"
    },
    {
        "region": "State of Andhra Pradesh",
        "country": "in"
    },
    {
        "region": "State of Arunachal Pradesh",
        "country": "in"
    },
    {
        "region": "State of Bihar",
        "country": "in"
    },
    {
        "region": "State of Chhattisgarh",
        "country": "in"
    },
    {
        "region": "State of Gujarat",
        "country": "in"
    },
    {
        "region": "State of Haryana",
        "country": "in"
    },
    {
        "region": "State of Himachal Pradesh",
        "country": "in"
    },
    {
        "region": "State of Jammu and Kashmir",
        "country": "in"
    },
    {
        "region": "State of Jharkhand",
        "country": "in"
    },
    {
        "region": "State of Karnataka",
        "country": "in"
    },
    {
        "region": "State of Kerala",
        "country": "in"
    },
    {
        "region": "State of Maharashtra",
        "country": "in"
    },
    {
        "region": "State of Nagaland",
        "country": "in"
    },
    {
        "region": "State of Odisha",
        "country": "in"
    },
    {
        "region": "State of Punjab",
        "country": "in"
    },
    {
        "region": "State of Rajasthan",
        "country": "in"
    },
    {
        "region": "State of Tamil Nadu",
        "country": "in"
    },
    {
        "region": "State of Uttarakhand",
        "country": "in"
    },
    {
        "region": "Telangana",
        "country": "in"
    },
    {
        "region": "Tripura",
        "country": "in"
    },
    {
        "region": "Union Territory of Andaman and Nicobar Islands",
        "country": "in"
    },
    {
        "region": "Union Territory of Chandigarh",
        "country": "in"
    },
    {
        "region": "Union Territory of Dadra and Nagar Haveli",
        "country": "in"
    },
    {
        "region": "Union Territory of Daman and Diu",
        "country": "in"
    },
    {
        "region": "Union Territory of Lakshadweep",
        "country": "in"
    },
    {
        "region": "Union Territory of Puducherry",
        "country": "in"
    },
    {
        "region": "Uttar Pradesh",
        "country": "in"
    },
    {
        "region": "West Bengal",
        "country": "in"
    }
]
                    });}


                if(req.body.codecode== "id"){return res.status(200).json({
statesData:[
    {
        "region": "Banten",
        "country": "id"
    },
    {
        "region": "Daerah Istimewa Yogyakarta",
        "country": "id"
    },
    {
        "region": "Daerah Khusus Ibukota Jakarta",
        "country": "id"
    },
    {
        "region": "Jawa Barat",
        "country": "id"
    },
    {
        "region": "Jawa Timur",
        "country": "id"
    },
    {
        "region": "Kepulauan Bangka Belitung",
        "country": "id"
    },
    {
        "region": "Nanggroe Aceh Darussalam Province",
        "country": "id"
    },
    {
        "region": "North Kalimantan",
        "country": "id"
    },
    {
        "region": "Propinsi Bengkulu",
        "country": "id"
    },
    {
        "region": "Provinsi Bali",
        "country": "id"
    },
    {
        "region": "Provinsi Gorontalo",
        "country": "id"
    },
    {
        "region": "Provinsi Jambi",
        "country": "id"
    },
    {
        "region": "Provinsi Jawa Tengah",
        "country": "id"
    },
    {
        "region": "Provinsi Kalimantan Barat",
        "country": "id"
    },
    {
        "region": "Provinsi Kalimantan Selatan",
        "country": "id"
    },
    {
        "region": "Provinsi Kalimantan Tengah",
        "country": "id"
    },
    {
        "region": "Provinsi Kalimantan Timur",
        "country": "id"
    },
    {
        "region": "Provinsi Kepulauan Riau",
        "country": "id"
    },
    {
        "region": "Provinsi Lampung",
        "country": "id"
    },
    {
        "region": "Provinsi Maluku",
        "country": "id"
    },
    {
        "region": "Provinsi Maluku Utara",
        "country": "id"
    },
    {
        "region": "Provinsi Nusa Tenggara Timur",
        "country": "id"
    },
    {
        "region": "Provinsi Papua",
        "country": "id"
    },
    {
        "region": "Provinsi Papua Barat",
        "country": "id"
    },
    {
        "region": "Provinsi Riau",
        "country": "id"
    },
    {
        "region": "Provinsi Sulawesi Barat",
        "country": "id"
    },
    {
        "region": "Provinsi Sulawesi Selatan",
        "country": "id"
    },
    {
        "region": "Provinsi Sumatera Barat",
        "country": "id"
    },
    {
        "region": "Sulawesi Tengah",
        "country": "id"
    },
    {
        "region": "Sulawesi Tenggara",
        "country": "id"
    },
    {
        "region": "Sulawesi Utara",
        "country": "id"
    },
    {
        "region": "Sumatera Selatan",
        "country": "id"
    },
    {
        "region": "Sumatera Utara",
        "country": "id"
    },
    {
        "region": "West Nusa Tenggara",
        "country": "id"
    }
]
                    });}


                if(req.body.codecode== "ir"){return res.status(200).json({
statesData:[
    {
        "region": "Alborz",
        "country": "ir"
    },
    {
        "region": "Bushehr",
        "country": "ir"
    },
    {
        "region": "East Azerbaijan",
        "country": "ir"
    },
    {
        "region": "Fars",
        "country": "ir"
    },
    {
        "region": "Hormozgan",
        "country": "ir"
    },
    {
        "region": "Isfahan",
        "country": "ir"
    },
    {
        "region": "Kerman",
        "country": "ir"
    },
    {
        "region": "Khuzestan",
        "country": "ir"
    },
    {
        "region": "Ostan-e Ardabil",
        "country": "ir"
    },
    {
        "region": "Ostan-e Azarbayjan-e Gharbi",
        "country": "ir"
    },
    {
        "region": "Ostan-e Chahar Mahal va Bakhtiari",
        "country": "ir"
    },
    {
        "region": "Ostan-e Gilan",
        "country": "ir"
    },
    {
        "region": "Ostan-e Golestan",
        "country": "ir"
    },
    {
        "region": "Ostan-e Hamadan",
        "country": "ir"
    },
    {
        "region": "Ostan-e Ilam",
        "country": "ir"
    },
    {
        "region": "Ostan-e Kermanshah",
        "country": "ir"
    },
    {
        "region": "Ostan-e Khorasan-e Jonubi",
        "country": "ir"
    },
    {
        "region": "Ostan-e Khorasan-e Razavi",
        "country": "ir"
    },
    {
        "region": "Ostan-e Khorasan-e Shomali",
        "country": "ir"
    },
    {
        "region": "Ostan-e Kohgiluyeh va Bowyer Ahmad",
        "country": "ir"
    },
    {
        "region": "Ostan-e Kordestan",
        "country": "ir"
    },
    {
        "region": "Ostan-e Lorestan",
        "country": "ir"
    },
    {
        "region": "Ostan-e Markazi",
        "country": "ir"
    },
    {
        "region": "Ostan-e Mazandaran",
        "country": "ir"
    },
    {
        "region": "Ostan-e Qazvin",
        "country": "ir"
    },
    {
        "region": "Ostan-e Semnan",
        "country": "ir"
    },
    {
        "region": "Ostan-e Tehran",
        "country": "ir"
    },
    {
        "region": "Ostan-e Zanjan",
        "country": "ir"
    },
    {
        "region": "Qom",
        "country": "ir"
    },
    {
        "region": "Sistan and Baluchestan",
        "country": "ir"
    },
    {
        "region": "Yazd",
        "country": "ir"
    }
]
                    });}


                if(req.body.codecode== "iq"){return res.status(200).json({
statesData:[
    {
        "region": "An Najaf",
        "country": "iq"
    },
    {
        "region": "Dihok",
        "country": "iq"
    },
    {
        "region": "Diyala",
        "country": "iq"
    },
    {
        "region": "Muhafazat al Anbar",
        "country": "iq"
    },
    {
        "region": "Muhafazat al Basrah",
        "country": "iq"
    },
    {
        "region": "Muhafazat al Muthanna",
        "country": "iq"
    },
    {
        "region": "Muhafazat al Qadisiyah",
        "country": "iq"
    },
    {
        "region": "Muhafazat Arbil",
        "country": "iq"
    },
    {
        "region": "Muhafazat as Sulaymaniyah",
        "country": "iq"
    },
    {
        "region": "Muhafazat Babil",
        "country": "iq"
    },
    {
        "region": "Muhafazat Baghdad",
        "country": "iq"
    },
    {
        "region": "Muhafazat Dhi Qar",
        "country": "iq"
    },
    {
        "region": "Muhafazat Karbala'",
        "country": "iq"
    },
    {
        "region": "Muhafazat Kirkuk",
        "country": "iq"
    },
    {
        "region": "Muhafazat Maysan",
        "country": "iq"
    },
    {
        "region": "Muhafazat Ninawa",
        "country": "iq"
    },
    {
        "region": "Muhafazat Salah ad Din",
        "country": "iq"
    },
    {
        "region": "Muhafazat Wasit",
        "country": "iq"
    }
]
                    });}


                if(req.body.codecode== "ie"){return res.status(200).json({
statesData:[
    {
        "region": "Connaught",
        "country": "ie"
    },
    {
        "region": "Leinster",
        "country": "ie"
    },
    {
        "region": "Munster",
        "country": "ie"
    },
    {
        "region": "Ulster",
        "country": "ie"
    }
]
                    });}


                if(req.body.codecode== "il"){return res.status(200).json({
statesData:[
    {
        "region": "Central District",
        "country": "il"
    },
    {
        "region": "Haifa",
        "country": "il"
    },
    {
        "region": "Jerusalem",
        "country": "il"
    },
    {
        "region": "Northern District",
        "country": "il"
    },
    {
        "region": "Southern District",
        "country": "il"
    },
    {
        "region": "Tel Aviv District",
        "country": "il"
    }
]
                    });}


                if(req.body.codecode== "it"){return res.status(200).json({
statesData:[
    {
        "region": "Abruzzo",
        "country": "it"
    },
    {
        "region": "Basilicata",
        "country": "it"
    },
    {
        "region": "Calabria",
        "country": "it"
    },
    {
        "region": "Campania",
        "country": "it"
    },
    {
        "region": "Emilia-Romagna",
        "country": "it"
    },
    {
        "region": "Friuli Venezia Giulia",
        "country": "it"
    },
    {
        "region": "Lazio",
        "country": "it"
    },
    {
        "region": "Liguria",
        "country": "it"
    },
    {
        "region": "Lombardia",
        "country": "it"
    },
    {
        "region": "Marche",
        "country": "it"
    },
    {
        "region": "Molise",
        "country": "it"
    },
    {
        "region": "Piemonte",
        "country": "it"
    },
    {
        "region": "Puglia",
        "country": "it"
    },
    {
        "region": "Regione Autonoma Valle d'Aosta",
        "country": "it"
    },
    {
        "region": "Sardegna",
        "country": "it"
    },
    {
        "region": "Sicilia",
        "country": "it"
    },
    {
        "region": "Toscana",
        "country": "it"
    },
    {
        "region": "Trentino-Alto Adige",
        "country": "it"
    },
    {
        "region": "Umbria",
        "country": "it"
    },
    {
        "region": "Veneto",
        "country": "it"
    }
]
                    });}


                if(req.body.codecode== "jm"){return res.status(200).json({
statesData:[
    {
        "region": "Clarendon",
        "country": "jm"
    },
    {
        "region": "Kingston",
        "country": "jm"
    },
    {
        "region": "Manchester",
        "country": "jm"
    },
    {
        "region": "Parish of Hanover",
        "country": "jm"
    },
    {
        "region": "Parish of Saint Ann",
        "country": "jm"
    },
    {
        "region": "Portland",
        "country": "jm"
    },
    {
        "region": "Saint Andrew",
        "country": "jm"
    },
    {
        "region": "Saint Catherine",
        "country": "jm"
    },
    {
        "region": "Saint Elizabeth",
        "country": "jm"
    },
    {
        "region": "Saint James",
        "country": "jm"
    },
    {
        "region": "Saint Mary",
        "country": "jm"
    },
    {
        "region": "Saint Thomas",
        "country": "jm"
    },
    {
        "region": "Trelawny",
        "country": "jm"
    },
    {
        "region": "Westmoreland",
        "country": "jm"
    }
]
                    });}


                if(req.body.codecode== "jp"){return res.status(200).json({
statesData:[
    {
        "region": "Aichi-ken",
        "country": "jp"
    },
    {
        "region": "Akita",
        "country": "jp"
    },
    {
        "region": "Aomori-ken",
        "country": "jp"
    },
    {
        "region": "Chiba-ken",
        "country": "jp"
    },
    {
        "region": "Ehime",
        "country": "jp"
    },
    {
        "region": "Fukui",
        "country": "jp"
    },
    {
        "region": "Fukuoka Prefecture",
        "country": "jp"
    },
    {
        "region": "Fukushima-ken",
        "country": "jp"
    },
    {
        "region": "Gifu",
        "country": "jp"
    },
    {
        "region": "Gunma-ken",
        "country": "jp"
    },
    {
        "region": "Hiroshima-ken",
        "country": "jp"
    },
    {
        "region": "Hokkaido",
        "country": "jp"
    },
    {
        "region": "Hyogo",
        "country": "jp"
    },
    {
        "region": "Ibaraki",
        "country": "jp"
    },
    {
        "region": "Ishikawa-ken",
        "country": "jp"
    },
    {
        "region": "Iwate",
        "country": "jp"
    },
    {
        "region": "Kagawa-ken",
        "country": "jp"
    },
    {
        "region": "Kagoshima-ken",
        "country": "jp"
    },
    {
        "region": "Kanagawa",
        "country": "jp"
    },
    {
        "region": "Kochi Prefecture",
        "country": "jp"
    },
    {
        "region": "Kumamoto",
        "country": "jp"
    },
    {
        "region": "Kyoto Prefecture",
        "country": "jp"
    },
    {
        "region": "Mie-ken",
        "country": "jp"
    },
    {
        "region": "Miyagi-ken",
        "country": "jp"
    },
    {
        "region": "Miyazaki",
        "country": "jp"
    },
    {
        "region": "Nagano-ken",
        "country": "jp"
    },
    {
        "region": "Nagasaki Prefecture",
        "country": "jp"
    },
    {
        "region": "Nara-ken",
        "country": "jp"
    },
    {
        "region": "Niigata-ken",
        "country": "jp"
    },
    {
        "region": "Oita Prefecture",
        "country": "jp"
    },
    {
        "region": "Okayama-ken",
        "country": "jp"
    },
    {
        "region": "Okinawa",
        "country": "jp"
    },
    {
        "region": "Osaka-fu",
        "country": "jp"
    },
    {
        "region": "Saga-ken",
        "country": "jp"
    },
    {
        "region": "Saitama-ken",
        "country": "jp"
    },
    {
        "region": "Shiga",
        "country": "jp"
    },
    {
        "region": "Shimane-ken",
        "country": "jp"
    },
    {
        "region": "Shizuoka",
        "country": "jp"
    },
    {
        "region": "Tochigi",
        "country": "jp"
    },
    {
        "region": "Tokushima-ken",
        "country": "jp"
    },
    {
        "region": "Tokyo Prefecture",
        "country": "jp"
    },
    {
        "region": "Tottori",
        "country": "jp"
    },
    {
        "region": "Toyama-ken",
        "country": "jp"
    },
    {
        "region": "Wakayama",
        "country": "jp"
    },
    {
        "region": "Yamagata-ken",
        "country": "jp"
    },
    {
        "region": "Yamaguchi",
        "country": "jp"
    },
    {
        "region": "Yamanashi",
        "country": "jp"
    }
]
                    });}


                if(req.body.codecode== "jo"){return res.status(200).json({
statesData:[
    {
        "region": "Ajloun",
        "country": "jo"
    },
    {
        "region": "Al Karak",
        "country": "jo"
    },
    {
        "region": "Al Mafraq",
        "country": "jo"
    },
    {
        "region": "Amman Governorate",
        "country": "jo"
    },
    {
        "region": "Irbid",
        "country": "jo"
    },
    {
        "region": "Jerash",
        "country": "jo"
    },
    {
        "region": "Muhafazat al 'Aqabah",
        "country": "jo"
    },
    {
        "region": "Muhafazat al Balqa'",
        "country": "jo"
    },
    {
        "region": "Muhafazat at Tafilah",
        "country": "jo"
    },
    {
        "region": "Muhafazat az Zarqa'",
        "country": "jo"
    },
    {
        "region": "Muhafazat Ma'an",
        "country": "jo"
    },
    {
        "region": "Muhafazat Madaba",
        "country": "jo"
    }
]
                    });}


                if(req.body.codecode== "kz"){return res.status(200).json({
statesData:[
    {
        "region": "Aktyubinskaya Oblast'",
        "country": "kz"
    },
    {
        "region": "Almaty Oblysy",
        "country": "kz"
    },
    {
        "region": "Almaty Qalasy",
        "country": "kz"
    },
    {
        "region": "Aqmola Oblysy",
        "country": "kz"
    },
    {
        "region": "Astana Qalasy",
        "country": "kz"
    },
    {
        "region": "Atyrau Oblysy",
        "country": "kz"
    },
    {
        "region": "Baikonur",
        "country": "kz"
    },
    {
        "region": "East Kazakhstan",
        "country": "kz"
    },
    {
        "region": "Mangistauskaya Oblast'",
        "country": "kz"
    },
    {
        "region": "North Kazakhstan",
        "country": "kz"
    },
    {
        "region": "Pavlodar Oblysy",
        "country": "kz"
    },
    {
        "region": "Qaraghandy Oblysy",
        "country": "kz"
    },
    {
        "region": "Qostanay Oblysy",
        "country": "kz"
    },
    {
        "region": "Qyzylorda Oblysy",
        "country": "kz"
    },
    {
        "region": "South Kazakhstan",
        "country": "kz"
    },
    {
        "region": "West Kazakhstan",
        "country": "kz"
    },
    {
        "region": "Zhambyl Oblysy",
        "country": "kz"
    }
]
                    });}


                if(req.body.codecode== "ke"){return res.status(200).json({
statesData:[
    {
        "region": "Baringo District",
        "country": "ke"
    },
    {
        "region": "Bomet District",
        "country": "ke"
    },
    {
        "region": "Bungoma District",
        "country": "ke"
    },
    {
        "region": "Busia District",
        "country": "ke"
    },
    {
        "region": "Embu District",
        "country": "ke"
    },
    {
        "region": "Garissa District",
        "country": "ke"
    },
    {
        "region": "Homa Bay District",
        "country": "ke"
    },
    {
        "region": "Isiolo District",
        "country": "ke"
    },
    {
        "region": "Kajiado District",
        "country": "ke"
    },
    {
        "region": "Kakamega District",
        "country": "ke"
    },
    {
        "region": "Kericho District",
        "country": "ke"
    },
    {
        "region": "Kiambu District",
        "country": "ke"
    },
    {
        "region": "Kilifi District",
        "country": "ke"
    },
    {
        "region": "Kirinyaga District",
        "country": "ke"
    },
    {
        "region": "Kisii District",
        "country": "ke"
    },
    {
        "region": "Kisumu",
        "country": "ke"
    },
    {
        "region": "Kitui District",
        "country": "ke"
    },
    {
        "region": "Kwale District",
        "country": "ke"
    },
    {
        "region": "Laikipia District",
        "country": "ke"
    },
    {
        "region": "Lamu",
        "country": "ke"
    },
    {
        "region": "Machakos District",
        "country": "ke"
    },
    {
        "region": "Makueni District",
        "country": "ke"
    },
    {
        "region": "Mandera District",
        "country": "ke"
    },
    {
        "region": "Marakwet District",
        "country": "ke"
    },
    {
        "region": "Marsabit District",
        "country": "ke"
    },
    {
        "region": "Meru",
        "country": "ke"
    },
    {
        "region": "Migori District",
        "country": "ke"
    },
    {
        "region": "Mombasa District",
        "country": "ke"
    },
    {
        "region": "Murang'a District",
        "country": "ke"
    },
    {
        "region": "Nairobi Province",
        "country": "ke"
    },
    {
        "region": "Nakuru District",
        "country": "ke"
    },
    {
        "region": "Nandi South District",
        "country": "ke"
    },
    {
        "region": "Narok District",
        "country": "ke"
    },
    {
        "region": "Nyamira District",
        "country": "ke"
    },
    {
        "region": "Nyandarua District",
        "country": "ke"
    },
    {
        "region": "Nyeri District",
        "country": "ke"
    },
    {
        "region": "Samburu District",
        "country": "ke"
    },
    {
        "region": "Siaya District",
        "country": "ke"
    },
    {
        "region": "Taita Taveta District",
        "country": "ke"
    },
    {
        "region": "Tana River District",
        "country": "ke"
    },
    {
        "region": "Tharaka District",
        "country": "ke"
    },
    {
        "region": "Trans Nzoia District",
        "country": "ke"
    },
    {
        "region": "Turkana District",
        "country": "ke"
    },
    {
        "region": "Uasin Gishu",
        "country": "ke"
    },
    {
        "region": "Vihiga District",
        "country": "ke"
    },
    {
        "region": "Wajir District",
        "country": "ke"
    },
    {
        "region": "West Pokot District",
        "country": "ke"
    }
]
                    });}


                if(req.body.codecode== "ki"){return res.status(200).json({
statesData:[
    {
        "region": "Gilbert Islands",
        "country": "ki"
    },
    {
        "region": "Line Islands",
        "country": "ki"
    },
    {
        "region": "Phoenix Islands",
        "country": "ki"
    }
]
                    });}


                if(req.body.codecode== "kp"){return res.status(200).json({
statesData:[
    {
        "region": "Chagang-do",
        "country": "kp"
    },
    {
        "region": "Hambuk",
        "country": "kp"
    },
    {
        "region": "Hamnam",
        "country": "kp"
    },
    {
        "region": "Hwanghae-bukto",
        "country": "kp"
    },
    {
        "region": "Hwanghae-namdo",
        "country": "kp"
    },
    {
        "region": "Kangwon-do",
        "country": "kp"
    },
    {
        "region": "P'yongan-bukto",
        "country": "kp"
    },
    {
        "region": "P'yongan-namdo",
        "country": "kp"
    },
    {
        "region": "Pyongyang",
        "country": "kp"
    },
    {
        "region": "Rason",
        "country": "kp"
    },
    {
        "region": "Ryanggang",
        "country": "kp"
    }
]
                    });}


                if(req.body.codecode== "kr"){return res.status(200).json({
statesData:[
    {
        "region": "Busan",
        "country": "kr"
    },
    {
        "region": "Chungcheongbuk-do",
        "country": "kr"
    },
    {
        "region": "Chungcheongnam-do",
        "country": "kr"
    },
    {
        "region": "Daegu",
        "country": "kr"
    },
    {
        "region": "Daejeon",
        "country": "kr"
    },
    {
        "region": "Gangwon-do",
        "country": "kr"
    },
    {
        "region": "Gwangju",
        "country": "kr"
    },
    {
        "region": "Gyeonggi-do",
        "country": "kr"
    },
    {
        "region": "Gyeongsangbuk-do",
        "country": "kr"
    },
    {
        "region": "Gyeongsangnam-do",
        "country": "kr"
    },
    {
        "region": "Incheon",
        "country": "kr"
    },
    {
        "region": "Jeju-do",
        "country": "kr"
    },
    {
        "region": "Jeollabuk-do",
        "country": "kr"
    },
    {
        "region": "Jeollanam-do",
        "country": "kr"
    },
    {
        "region": "Sejong-si",
        "country": "kr"
    },
    {
        "region": "Seoul",
        "country": "kr"
    },
    {
        "region": "Ulsan",
        "country": "kr"
    }
]
                    });}


                if(req.body.codecode== "kw"){return res.status(200).json({
statesData:[
    {
        "region": "Al Asimah Governorate",
        "country": "kw"
    },
    {
        "region": "Muhafazat al Ahmadi",
        "country": "kw"
    },
    {
        "region": "Muhafazat al Farwaniyah",
        "country": "kw"
    },
    {
        "region": "Muhafazat al Jahra'",
        "country": "kw"
    },
    {
        "region": "Muhafazat Hawalli",
        "country": "kw"
    },
    {
        "region": "Muhafazat Mubarak al Kabir",
        "country": "kw"
    }
]
                    });}


                if(req.body.codecode== "kg"){return res.status(200).json({
statesData:[
    {
        "region": "Batken",
        "country": "kg"
    },
    {
        "region": "Chuyskaya Oblast'",
        "country": "kg"
    },
    {
        "region": "Gorod Bishkek",
        "country": "kg"
    },
    {
        "region": "Issyk-Kul Region",
        "country": "kg"
    },
    {
        "region": "Jalal-Abad oblast",
        "country": "kg"
    },
    {
        "region": "Naryn oblast",
        "country": "kg"
    },
    {
        "region": "Osh City",
        "country": "kg"
    },
    {
        "region": "Osh Oblasty",
        "country": "kg"
    },
    {
        "region": "Talas",
        "country": "kg"
    }
]
                    });}


                if(req.body.codecode== "la"){return res.status(200).json({
statesData:[
    {
        "region": "Attapu",
        "country": "la"
    },
    {
        "region": "Bolikhamxai",
        "country": "la"
    },
    {
        "region": "Champasak",
        "country": "la"
    },
    {
        "region": "Houaphan",
        "country": "la"
    },
    {
        "region": "Khammouan",
        "country": "la"
    },
    {
        "region": "Khoueng Bokeo",
        "country": "la"
    },
    {
        "region": "Khoueng Oudomxai",
        "country": "la"
    },
    {
        "region": "Khoueng Phongsali",
        "country": "la"
    },
    {
        "region": "Khoueng Savannakhet",
        "country": "la"
    },
    {
        "region": "Khoueng Xekong",
        "country": "la"
    },
    {
        "region": "Louangnamtha",
        "country": "la"
    },
    {
        "region": "Luang Prabang Province",
        "country": "la"
    },
    {
        "region": "Salavan",
        "country": "la"
    },
    {
        "region": "Vientiane Prefecture",
        "country": "la"
    },
    {
        "region": "Vientiane Province",
        "country": "la"
    },
    {
        "region": "Xaignabouli",
        "country": "la"
    },
    {
        "region": "Xaisomboun Province",
        "country": "la"
    },
    {
        "region": "Xiangkhouang",
        "country": "la"
    }
]
                    });}


                if(req.body.codecode== "lv"){return res.status(200).json({
statesData:[
    {
        "region": "Adazu Novads",
        "country": "lv"
    },
    {
        "region": "Aglonas Novads",
        "country": "lv"
    },
    {
        "region": "Aizkraukles Rajons",
        "country": "lv"
    },
    {
        "region": "Aizputes Novads",
        "country": "lv"
    },
    {
        "region": "Aknistes Novads",
        "country": "lv"
    },
    {
        "region": "Alojas Novads",
        "country": "lv"
    },
    {
        "region": "Alsungas Novads",
        "country": "lv"
    },
    {
        "region": "Aluksnes Novads",
        "country": "lv"
    },
    {
        "region": "Amatas Novads",
        "country": "lv"
    },
    {
        "region": "Apes Novads",
        "country": "lv"
    },
    {
        "region": "Auces Novads",
        "country": "lv"
    },
    {
        "region": "Babites Novads",
        "country": "lv"
    },
    {
        "region": "Baldones Novads",
        "country": "lv"
    },
    {
        "region": "Baltinavas Novads",
        "country": "lv"
    },
    {
        "region": "Balvu Novads",
        "country": "lv"
    },
    {
        "region": "Bauskas Novads",
        "country": "lv"
    },
    {
        "region": "Beverinas Novads",
        "country": "lv"
    },
    {
        "region": "Brocenu Novads",
        "country": "lv"
    },
    {
        "region": "Burtnieku Novads",
        "country": "lv"
    },
    {
        "region": "Carnikavas Novads",
        "country": "lv"
    },
    {
        "region": "Cesu Novads",
        "country": "lv"
    },
    {
        "region": "Cesvaines Novads",
        "country": "lv"
    },
    {
        "region": "Ciblas Novads",
        "country": "lv"
    },
    {
        "region": "Dagdas Novads",
        "country": "lv"
    },
    {
        "region": "Daugavpils",
        "country": "lv"
    },
    {
        "region": "Daugavpils municipality",
        "country": "lv"
    },
    {
        "region": "Dobeles Rajons",
        "country": "lv"
    },
    {
        "region": "Dundagas Novads",
        "country": "lv"
    },
    {
        "region": "Durbes Novads",
        "country": "lv"
    },
    {
        "region": "Engures Novads",
        "country": "lv"
    },
    {
        "region": "Erglu Novads",
        "country": "lv"
    },
    {
        "region": "Garkalne Municipality",
        "country": "lv"
    },
    {
        "region": "Grobinas Novads",
        "country": "lv"
    },
    {
        "region": "Gulbenes Rajons",
        "country": "lv"
    },
    {
        "region": "Iecavas Novads",
        "country": "lv"
    },
    {
        "region": "Ikskiles Novads",
        "country": "lv"
    },
    {
        "region": "Ilukstes Novads",
        "country": "lv"
    },
    {
        "region": "Incukalna Novads",
        "country": "lv"
    },
    {
        "region": "Jaunjelgavas Novads",
        "country": "lv"
    },
    {
        "region": "Jaunpiebalgas Novads",
        "country": "lv"
    },
    {
        "region": "Jaunpils Novads",
        "country": "lv"
    },
    {
        "region": "Jekabpils",
        "country": "lv"
    },
    {
        "region": "Jekabpils Municipality",
        "country": "lv"
    },
    {
        "region": "Jelgava",
        "country": "lv"
    },
    {
        "region": "Jelgavas Rajons",
        "country": "lv"
    },
    {
        "region": "Jurmala",
        "country": "lv"
    },
    {
        "region": "Kandavas Novads",
        "country": "lv"
    },
    {
        "region": "Karsavas Novads",
        "country": "lv"
    },
    {
        "region": "Keguma Novads",
        "country": "lv"
    },
    {
        "region": "Kekavas Novads",
        "country": "lv"
    },
    {
        "region": "Kocenu Novads",
        "country": "lv"
    },
    {
        "region": "Kokneses Novads",
        "country": "lv"
    },
    {
        "region": "Kraslavas Rajons",
        "country": "lv"
    },
    {
        "region": "Krimuldas Novads",
        "country": "lv"
    },
    {
        "region": "Krustpils Novads",
        "country": "lv"
    },
    {
        "region": "Kuldigas Rajons",
        "country": "lv"
    },
    {
        "region": "Lielvardes Novads",
        "country": "lv"
    },
    {
        "region": "Liepaja",
        "country": "lv"
    },
    {
        "region": "Ligatnes Novads",
        "country": "lv"
    },
    {
        "region": "Limbazu Rajons",
        "country": "lv"
    },
    {
        "region": "Livanu Novads",
        "country": "lv"
    },
    {
        "region": "Lubanas Novads",
        "country": "lv"
    },
    {
        "region": "Ludzas Rajons",
        "country": "lv"
    },
    {
        "region": "Madona Municipality",
        "country": "lv"
    },
    {
        "region": "Malpils Novads",
        "country": "lv"
    },
    {
        "region": "Marupes Novads",
        "country": "lv"
    },
    {
        "region": "Mazsalacas Novads",
        "country": "lv"
    },
    {
        "region": "Mersraga Novads",
        "country": "lv"
    },
    {
        "region": "Nauksenu Novads",
        "country": "lv"
    },
    {
        "region": "Neretas Novads",
        "country": "lv"
    },
    {
        "region": "Nicas Novads",
        "country": "lv"
    },
    {
        "region": "Ogres novads",
        "country": "lv"
    },
    {
        "region": "Olaines Novads",
        "country": "lv"
    },
    {
        "region": "Ozolnieku Novads",
        "country": "lv"
    },
    {
        "region": "Pargaujas Novads",
        "country": "lv"
    },
    {
        "region": "Pavilostas Novads",
        "country": "lv"
    },
    {
        "region": "Plavinu Novads",
        "country": "lv"
    },
    {
        "region": "Preili Municipality",
        "country": "lv"
    },
    {
        "region": "Priekules Novads",
        "country": "lv"
    },
    {
        "region": "Priekuli Municipality",
        "country": "lv"
    },
    {
        "region": "Raunas Novads",
        "country": "lv"
    },
    {
        "region": "Rezekne",
        "country": "lv"
    },
    {
        "region": "Rezeknes Novads",
        "country": "lv"
    },
    {
        "region": "Riebinu Novads",
        "country": "lv"
    },
    {
        "region": "Riga",
        "country": "lv"
    },
    {
        "region": "Rojas Novads",
        "country": "lv"
    },
    {
        "region": "Ropazu Novads",
        "country": "lv"
    },
    {
        "region": "Rucavas Novads",
        "country": "lv"
    },
    {
        "region": "Rugaju Novads",
        "country": "lv"
    },
    {
        "region": "Rujienas Novads",
        "country": "lv"
    },
    {
        "region": "Rundales Novads",
        "country": "lv"
    },
    {
        "region": "Salacgrivas Novads",
        "country": "lv"
    },
    {
        "region": "Salas Novads",
        "country": "lv"
    },
    {
        "region": "Salaspils Novads",
        "country": "lv"
    },
    {
        "region": "Saldus Municipality",
        "country": "lv"
    },
    {
        "region": "Saulkrastu Novads",
        "country": "lv"
    },
    {
        "region": "Sejas Novads",
        "country": "lv"
    },
    {
        "region": "Siguldas Novads",
        "country": "lv"
    },
    {
        "region": "Skriveru Novads",
        "country": "lv"
    },
    {
        "region": "Skrundas Novads",
        "country": "lv"
    },
    {
        "region": "Smiltenes Novads",
        "country": "lv"
    },
    {
        "region": "Stopinu Novads",
        "country": "lv"
    },
    {
        "region": "Strencu Novads",
        "country": "lv"
    },
    {
        "region": "Talsi Municipality",
        "country": "lv"
    },
    {
        "region": "Tervetes Novads",
        "country": "lv"
    },
    {
        "region": "Tukuma Rajons",
        "country": "lv"
    },
    {
        "region": "Vainodes Novads",
        "country": "lv"
    },
    {
        "region": "Valka Municipality",
        "country": "lv"
    },
    {
        "region": "Valmiera District",
        "country": "lv"
    },
    {
        "region": "Varaklanu Novads",
        "country": "lv"
    },
    {
        "region": "Varkavas Novads",
        "country": "lv"
    },
    {
        "region": "Vecpiebalgas Novads",
        "country": "lv"
    },
    {
        "region": "Vecumnieku Novads",
        "country": "lv"
    },
    {
        "region": "Ventspils",
        "country": "lv"
    },
    {
        "region": "Ventspils Municipality",
        "country": "lv"
    },
    {
        "region": "Viesites Novads",
        "country": "lv"
    },
    {
        "region": "Vilakas Novads",
        "country": "lv"
    },
    {
        "region": "Vilanu Novads",
        "country": "lv"
    },
    {
        "region": "Zilupes Novads",
        "country": "lv"
    }
]
                    });}


                if(req.body.codecode== "lb"){return res.status(200).json({
statesData:[
    {
        "region": "Beyrouth",
        "country": "lb"
    },
    {
        "region": "Mohafazat Aakkar",
        "country": "lb"
    },
    {
        "region": "Mohafazat Baalbek-Hermel",
        "country": "lb"
    },
    {
        "region": "Mohafazat Beqaa",
        "country": "lb"
    },
    {
        "region": "Mohafazat Liban-Nord",
        "country": "lb"
    },
    {
        "region": "Mohafazat Liban-Sud",
        "country": "lb"
    },
    {
        "region": "Mohafazat Mont-Liban",
        "country": "lb"
    },
    {
        "region": "Mohafazat Nabatiye",
        "country": "lb"
    }
]
                    });}


                if(req.body.codecode== "ls"){return res.status(200).json({
statesData:[
    {
        "region": "Berea",
        "country": "ls"
    },
    {
        "region": "Butha-Buthe",
        "country": "ls"
    },
    {
        "region": "Leribe District",
        "country": "ls"
    },
    {
        "region": "Mafeteng District",
        "country": "ls"
    },
    {
        "region": "Maseru",
        "country": "ls"
    },
    {
        "region": "Mohale's Hoek District",
        "country": "ls"
    },
    {
        "region": "Mokhotlong",
        "country": "ls"
    },
    {
        "region": "Qacha's Nek",
        "country": "ls"
    },
    {
        "region": "Quthing",
        "country": "ls"
    },
    {
        "region": "Thaba-Tseka",
        "country": "ls"
    }
]
                    });}


                if(req.body.codecode== "lr"){return res.status(200).json({
statesData:[
    {
        "region": "Bomi County",
        "country": "lr"
    },
    {
        "region": "Bong County",
        "country": "lr"
    },
    {
        "region": "Gbarpolu County",
        "country": "lr"
    },
    {
        "region": "Grand Bassa County",
        "country": "lr"
    },
    {
        "region": "Grand Cape Mount County",
        "country": "lr"
    },
    {
        "region": "Grand Gedeh County",
        "country": "lr"
    },
    {
        "region": "Grand Kru County",
        "country": "lr"
    },
    {
        "region": "Lofa County",
        "country": "lr"
    },
    {
        "region": "Margibi County",
        "country": "lr"
    },
    {
        "region": "Maryland County",
        "country": "lr"
    },
    {
        "region": "Montserrado County",
        "country": "lr"
    },
    {
        "region": "Nimba County",
        "country": "lr"
    },
    {
        "region": "River Cess County",
        "country": "lr"
    },
    {
        "region": "River Gee County",
        "country": "lr"
    },
    {
        "region": "Sinoe County",
        "country": "lr"
    }
]
                    });}


                if(req.body.codecode== "ly"){return res.status(200).json({
statesData:[
    {
        "region": "Al Jufrah",
        "country": "ly"
    },
    {
        "region": "Al Kufrah",
        "country": "ly"
    },
    {
        "region": "Al Marj",
        "country": "ly"
    },
    {
        "region": "Al Marqab",
        "country": "ly"
    },
    {
        "region": "Darnah",
        "country": "ly"
    },
    {
        "region": "Jabal al Gharbi District",
        "country": "ly"
    },
    {
        "region": "Murzuq",
        "country": "ly"
    },
    {
        "region": "Sha`biyat Nalut",
        "country": "ly"
    },
    {
        "region": "Sha'biyat al Butnan",
        "country": "ly"
    },
    {
        "region": "Sha'biyat al Jabal al Akhdar",
        "country": "ly"
    },
    {
        "region": "Sha'biyat al Jafarah",
        "country": "ly"
    },
    {
        "region": "Sha'biyat al Wahat",
        "country": "ly"
    },
    {
        "region": "Sha'biyat an Nuqat al Khams",
        "country": "ly"
    },
    {
        "region": "Sha'biyat az Zawiyah",
        "country": "ly"
    },
    {
        "region": "Sha'biyat Banghazi",
        "country": "ly"
    },
    {
        "region": "Sha'biyat Ghat",
        "country": "ly"
    },
    {
        "region": "Sha'biyat Misratah",
        "country": "ly"
    },
    {
        "region": "Sha'biyat Sabha",
        "country": "ly"
    },
    {
        "region": "Sha'biyat Wadi al Hayat",
        "country": "ly"
    },
    {
        "region": "Sha'biyat Wadi ash Shati'",
        "country": "ly"
    },
    {
        "region": "Surt",
        "country": "ly"
    },
    {
        "region": "Tripoli",
        "country": "ly"
    }
]
                    });}


                if(req.body.codecode== "li"){return res.status(200).json({
statesData:[
    {
        "region": "Balzers",
        "country": "li"
    },
    {
        "region": "Eschen",
        "country": "li"
    },
    {
        "region": "Gamprin",
        "country": "li"
    },
    {
        "region": "Mauren",
        "country": "li"
    },
    {
        "region": "Planken",
        "country": "li"
    },
    {
        "region": "Ruggell",
        "country": "li"
    },
    {
        "region": "Schaan",
        "country": "li"
    },
    {
        "region": "Schellenberg",
        "country": "li"
    },
    {
        "region": "Triesen",
        "country": "li"
    },
    {
        "region": "Triesenberg",
        "country": "li"
    },
    {
        "region": "Vaduz",
        "country": "li"
    }
]
                    });}


                if(req.body.codecode== "lt"){return res.status(200).json({
statesData:[
    {
        "region": "Alytus County",
        "country": "lt"
    },
    {
        "region": "Kaunas County",
        "country": "lt"
    },
    {
        "region": "Klaipeda County",
        "country": "lt"
    },
    {
        "region": "Marijampole County",
        "country": "lt"
    },
    {
        "region": "Panevezys",
        "country": "lt"
    },
    {
        "region": "Siauliai County",
        "country": "lt"
    },
    {
        "region": "Taurage County",
        "country": "lt"
    },
    {
        "region": "Telsiu apskritis",
        "country": "lt"
    },
    {
        "region": "Utena County",
        "country": "lt"
    },
    {
        "region": "Vilniaus apskritis",
        "country": "lt"
    }
]
                    });}


                if(req.body.codecode== "lu"){return res.status(200).json({
statesData:[
    {
        "region": "Canton d'Echternach",
        "country": "lu"
    },
    {
        "region": "Canton d'Esch-sur-Alzette",
        "country": "lu"
    },
    {
        "region": "Capellen",
        "country": "lu"
    },
    {
        "region": "Clervaux",
        "country": "lu"
    },
    {
        "region": "Diekirch",
        "country": "lu"
    },
    {
        "region": "Grevenmacher",
        "country": "lu"
    },
    {
        "region": "Luxembourg",
        "country": "lu"
    },
    {
        "region": "Mersch",
        "country": "lu"
    },
    {
        "region": "Redange",
        "country": "lu"
    },
    {
        "region": "Remich",
        "country": "lu"
    },
    {
        "region": "Vianden",
        "country": "lu"
    },
    {
        "region": "Wiltz",
        "country": "lu"
    }
]
                    });}


                if(req.body.codecode== "mo"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mk"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mg"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mw"){return res.status(200).json({
statesData:[]
                    });}



                if(req.body.codecode== "my"){return res.status(200).json({
statesData:[]
                    });}



                if(req.body.codecode== "mv"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "ml"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mt"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mh"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mq"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mr"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mu"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "yt"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mx"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "md"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mc"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mn"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "ms"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "ma"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mz"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mm"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "na"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "nr"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "np"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "nl"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "an"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "nc"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "nz"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "ni"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "ne"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "ng"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "nu"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "nf"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "mp"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "no"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "gg"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "om"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "pk"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "pw"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "ps"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "pa"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "pg"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "py"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "pe"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "ph"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "pn"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "pl"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "pt"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "qa"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "re"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "ro"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "ru"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "rw"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "gs"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "sh"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "kn"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "lc"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "pm"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "vc"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "ws"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "sm"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "st"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "sa"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "sn"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "sc"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "sl"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "sg"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "sk"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "si"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "sb"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "so"){return res.status(200).json({
statesData:[
    {
        "region": "Gobolka Awdal",
        "country": "so"
    },
    {
        "region": "Gobolka Bakool",
        "country": "so"
    },
    {
        "region": "Gobolka Banaadir",
        "country": "so"
    },
    {
        "region": "Gobolka Bari",
        "country": "so"
    },
    {
        "region": "Gobolka Bay",
        "country": "so"
    },
    {
        "region": "Gobolka Galguduud",
        "country": "so"
    },
    {
        "region": "Gobolka Gedo",
        "country": "so"
    },
    {
        "region": "Gobolka Hiiraan",
        "country": "so"
    },
    {
        "region": "Gobolka Jubbada Dhexe",
        "country": "so"
    },
    {
        "region": "Gobolka Jubbada Hoose",
        "country": "so"
    },
    {
        "region": "Gobolka Mudug",
        "country": "so"
    },
    {
        "region": "Gobolka Nugaal",
        "country": "so"
    },
    {
        "region": "Gobolka Sanaag",
        "country": "so"
    },
    {
        "region": "Gobolka Shabeellaha Dhexe",
        "country": "so"
    },
    {
        "region": "Gobolka Shabeellaha Hoose",
        "country": "so"
    },
    {
        "region": "Gobolka Sool",
        "country": "so"
    },
    {
        "region": "Gobolka Togdheer",
        "country": "so"
    },
    {
        "region": "Gobolka Woqooyi Galbeed",
        "country": "so"
    }
]
                    });}


                if(req.body.codecode== "za"){return res.status(200).json({
statesData:[
    {
        "region": "Eastern Cape",
        "country": "za"
    },
    {
        "region": "Free State",
        "country": "za"
    },
    {
        "region": "Gauteng",
        "country": "za"
    },
    {
        "region": "Limpopo",
        "country": "za"
    },
    {
        "region": "Mpumalanga",
        "country": "za"
    },
    {
        "region": "Province of KwaZulu-Natal",
        "country": "za"
    },
    {
        "region": "Province of North West",
        "country": "za"
    },
    {
        "region": "Province of Northern Cape",
        "country": "za"
    },
    {
        "region": "Western Cape",
        "country": "za"
    }
]
                    });}


                if(req.body.codecode== "es"){return res.status(200).json({
statesData:[
    {
        "region": "Andalucia",
        "country": "es"
    },
    {
        "region": "Aragon",
        "country": "es"
    },
    {
        "region": "Canary Islands",
        "country": "es"
    },
    {
        "region": "Cantabria",
        "country": "es"
    },
    {
        "region": "Castilla y Leon",
        "country": "es"
    },
    {
        "region": "Castilla-La Mancha",
        "country": "es"
    },
    {
        "region": "Catalunya",
        "country": "es"
    },
    {
        "region": "Ceuta",
        "country": "es"
    },
    {
        "region": "Comunidad de Madrid",
        "country": "es"
    },
    {
        "region": "Comunitat Autonoma de les Illes Balears",
        "country": "es"
    },
    {
        "region": "Comunitat Valenciana",
        "country": "es"
    },
    {
        "region": "Euskal Autonomia Erkidegoa",
        "country": "es"
    },
    {
        "region": "Extremadura",
        "country": "es"
    },
    {
        "region": "Galicia",
        "country": "es"
    },
    {
        "region": "La Rioja",
        "country": "es"
    },
    {
        "region": "Melilla",
        "country": "es"
    },
    {
        "region": "Navarra",
        "country": "es"
    },
    {
        "region": "Principality of Asturias",
        "country": "es"
    },
    {
        "region": "Region de Murcia",
        "country": "es"
    }
]
                    });}


                if(req.body.codecode== "lk"){return res.status(200).json({
statesData:[
    {
        "region": "Central Province",
        "country": "lk"
    },
    {
        "region": "Eastern Province",
        "country": "lk"
    },
    {
        "region": "North Central Province",
        "country": "lk"
    },
    {
        "region": "North Western Province",
        "country": "lk"
    },
    {
        "region": "Northern Province",
        "country": "lk"
    },
    {
        "region": "Province of Sabaragamuwa",
        "country": "lk"
    },
    {
        "region": "Province of Uva",
        "country": "lk"
    },
    {
        "region": "Southern Province",
        "country": "lk"
    },
    {
        "region": "Western Province",
        "country": "lk"
    }
]
                    });}


                if(req.body.codecode== "sd"){return res.status(200).json({
statesData:[
    {
        "region": "Al Jazirah State",
        "country": "sd"
    },
    {
        "region": "Al Qadarif State",
        "country": "sd"
    },
    {
        "region": "Blue Nile",
        "country": "sd"
    },
    {
        "region": "Central Darfur State",
        "country": "sd"
    },
    {
        "region": "East Darfur",
        "country": "sd"
    },
    {
        "region": "Kassala State",
        "country": "sd"
    },
    {
        "region": "Khartoum",
        "country": "sd"
    },
    {
        "region": "North Darfur",
        "country": "sd"
    },
    {
        "region": "North Kordofan",
        "country": "sd"
    },
    {
        "region": "Northern",
        "country": "sd"
    },
    {
        "region": "Red Sea",
        "country": "sd"
    },
    {
        "region": "River Nile",
        "country": "sd"
    },
    {
        "region": "Sennar",
        "country": "sd"
    },
    {
        "region": "South Darfur",
        "country": "sd"
    },
    {
        "region": "South Kordofan",
        "country": "sd"
    },
    {
        "region": "West Darfur",
        "country": "sd"
    },
    {
        "region": "West Kordofan State",
        "country": "sd"
    },
    {
        "region": "White Nile",
        "country": "sd"
    }
]
                    });}



                if(req.body.codecode== "sr"){return res.status(200).json({
statesData:[
    {
        "region": "Distrikt Brokopondo",
        "country": "sr"
    },
    {
        "region": "Distrikt Commewijne",
        "country": "sr"
    },
    {
        "region": "Distrikt Coronie",
        "country": "sr"
    },
    {
        "region": "Distrikt Marowijne",
        "country": "sr"
    },
    {
        "region": "Distrikt Nickerie",
        "country": "sr"
    },
    {
        "region": "Distrikt Para",
        "country": "sr"
    },
    {
        "region": "Distrikt Paramaribo",
        "country": "sr"
    },
    {
        "region": "Distrikt Saramacca",
        "country": "sr"
    },
    {
        "region": "Distrikt Sipaliwini",
        "country": "sr"
    },
    {
        "region": "Distrikt Wanica",
        "country": "sr"
    }
]
                    });}


                if(req.body.codecode== "sj"){return res.status(200).json({
statesData:[
    {
        "region": "Jan Mayen",
        "country": "sj"
    },
    {
        "region": "Svalbard",
        "country": "sj"
    }
]
                    });}


                if(req.body.codecode== "sz"){return res.status(200).json({
statesData:[
    {
        "region": "Hhohho District",
        "country": "sz"
    },
    {
        "region": "Lubombo District",
        "country": "sz"
    },
    {
        "region": "Manzini District",
        "country": "sz"
    },
    {
        "region": "Shiselweni District",
        "country": "sz"
    }
]
                    });}


                if(req.body.codecode== "se"){return res.status(200).json({
statesData:[
    {
        "region": "Blekinge",
        "country": "se"
    },
    {
        "region": "Dalarna",
        "country": "se"
    },
    {
        "region": "Gaevleborgs laen",
        "country": "se"
    },
    {
        "region": "Gotland",
        "country": "se"
    },
    {
        "region": "Halland",
        "country": "se"
    },
    {
        "region": "Jaemtlands laen",
        "country": "se"
    },
    {
        "region": "Joenkoepings laen",
        "country": "se"
    },
    {
        "region": "Kalmar",
        "country": "se"
    },
    {
        "region": "Kronoberg",
        "country": "se"
    },
    {
        "region": "Norrbotten",
        "country": "se"
    },
    {
        "region": "OErebro laen",
        "country": "se"
    },
    {
        "region": "OEstergoetlands laen",
        "country": "se"
    },
    {
        "region": "Skane laen",
        "country": "se"
    },
    {
        "region": "Soedermanlands laen",
        "country": "se"
    },
    {
        "region": "Stockholm",
        "country": "se"
    },
    {
        "region": "Uppsala",
        "country": "se"
    },
    {
        "region": "Vaermlands laen",
        "country": "se"
    },
    {
        "region": "Vaesterbottens laen",
        "country": "se"
    },
    {
        "region": "Vaesternorrlands laen",
        "country": "se"
    },
    {
        "region": "Vaestmanlands laen",
        "country": "se"
    },
    {
        "region": "Vaestra Goetalands laen",
        "country": "se"
    }
]
                    });}


                if(req.body.codecode== "ch"){return res.status(200).json({
statesData:[
    {
        "region": "Canton de Berne",
        "country": "ch"
    },
    {
        "region": "Canton de Fribourg",
        "country": "ch"
    },
    {
        "region": "Canton de Vaud",
        "country": "ch"
    },
    {
        "region": "Canton du Valais",
        "country": "ch"
    },
    {
        "region": "Geneve",
        "country": "ch"
    },
    {
        "region": "Jura",
        "country": "ch"
    },
    {
        "region": "Kanton Aargau",
        "country": "ch"
    },
    {
        "region": "Kanton Appenzell Ausserrhoden",
        "country": "ch"
    },
    {
        "region": "Kanton Appenzell Innerrhoden",
        "country": "ch"
    },
    {
        "region": "Kanton Basel-Landschaft",
        "country": "ch"
    },
    {
        "region": "Kanton Basel-Stadt",
        "country": "ch"
    },
    {
        "region": "Kanton Glarus",
        "country": "ch"
    },
    {
        "region": "Kanton Graubunden",
        "country": "ch"
    },
    {
        "region": "Kanton Luzern",
        "country": "ch"
    },
    {
        "region": "Kanton Nidwalden",
        "country": "ch"
    },
    {
        "region": "Kanton Obwalden",
        "country": "ch"
    },
    {
        "region": "Kanton Schaffhausen",
        "country": "ch"
    },
    {
        "region": "Kanton Schwyz",
        "country": "ch"
    },
    {
        "region": "Kanton Solothurn",
        "country": "ch"
    },
    {
        "region": "Kanton St. Gallen",
        "country": "ch"
    },
    {
        "region": "Kanton Thurgau",
        "country": "ch"
    },
    {
        "region": "Kanton Uri",
        "country": "ch"
    },
    {
        "region": "Kanton Zug",
        "country": "ch"
    },
    {
        "region": "Kanton Zurich",
        "country": "ch"
    },
    {
        "region": "Neuchatel",
        "country": "ch"
    },
    {
        "region": "Ticino",
        "country": "ch"
    }
]
                    });}


                if(req.body.codecode== "sy"){return res.status(200).json({
statesData:[
    {
        "region": "Al-Hasakah Governorate",
        "country": "sy"
    },
    {
        "region": "Aleppo Governorate",
        "country": "sy"
    },
    {
        "region": "Ar-Raqqah Governorate",
        "country": "sy"
    },
    {
        "region": "As-Suwayda Governorate",
        "country": "sy"
    },
    {
        "region": "Damascus Governorate",
        "country": "sy"
    },
    {
        "region": "Daraa Governorate",
        "country": "sy"
    },
    {
        "region": "Deir ez-Zor Governorate",
        "country": "sy"
    },
    {
        "region": "Hama Governorate",
        "country": "sy"
    },
    {
        "region": "Homs Governorate",
        "country": "sy"
    },
    {
        "region": "Idlib Governorate",
        "country": "sy"
    },
    {
        "region": "Latakia Governorate",
        "country": "sy"
    },
    {
        "region": "Muhafazat Rif Dimashq",
        "country": "sy"
    },
    {
        "region": "Quneitra Governorate",
        "country": "sy"
    },
    {
        "region": "Tartus Governorate",
        "country": "sy"
    }
]
                    });}


                if(req.body.codecode== "tw"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "tj"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "tz"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "th"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "tg"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "tk"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "to"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "tt"){return res.status(200).json({
statesData:[
    {
        "region": "Arima",
        "country": "tt"
    },
    {
        "region": "Chaguanas",
        "country": "tt"
    },
    {
        "region": "City of Port of Spain",
        "country": "tt"
    },
    {
        "region": "Couva-Tabaquite-Talparo",
        "country": "tt"
    },
    {
        "region": "Diego Martin",
        "country": "tt"
    },
    {
        "region": "Mayaro",
        "country": "tt"
    },
    {
        "region": "Penal/Debe",
        "country": "tt"
    },
    {
        "region": "Point Fortin",
        "country": "tt"
    },
    {
        "region": "Princes Town",
        "country": "tt"
    },
    {
        "region": "San Fernando",
        "country": "tt"
    },
    {
        "region": "San Juan/Laventille",
        "country": "tt"
    },
    {
        "region": "Sangre Grande",
        "country": "tt"
    },
    {
        "region": "Siparia",
        "country": "tt"
    },
    {
        "region": "Tobago",
        "country": "tt"
    },
    {
        "region": "Tunapuna/Piarco",
        "country": "tt"
    }
]
                    });}


                if(req.body.codecode== "tn"){return res.status(200).json({
statesData:[
    {
        "region": "Gafsa Governorate",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Beja",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Ben Arous",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Bizerte",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Gabes",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Jendouba",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Kairouan",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Kasserine",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Kebili",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Kef",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de l'Ariana",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Mahdia",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Medenine",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Monastir",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Nabeul",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Sfax",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Sidi Bouzid",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Siliana",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Sousse",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Tozeur",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Tunis",
        "country": "tn"
    },
    {
        "region": "Gouvernorat de Zaghouan",
        "country": "tn"
    },
    {
        "region": "Manouba",
        "country": "tn"
    },
    {
        "region": "Tataouine",
        "country": "tn"
    }
]
                    });}


                if(req.body.codecode== "tr"){return res.status(200).json({
statesData:[
    {
        "region": "Adana",
        "country": "tr"
    },
    {
        "region": "Adiyaman",
        "country": "tr"
    },
    {
        "region": "Afyonkarahisar",
        "country": "tr"
    },
    {
        "region": "Agri",
        "country": "tr"
    },
    {
        "region": "Aksaray",
        "country": "tr"
    },
    {
        "region": "Amasya",
        "country": "tr"
    },
    {
        "region": "Ankara",
        "country": "tr"
    },
    {
        "region": "Antalya",
        "country": "tr"
    },
    {
        "region": "Ardahan",
        "country": "tr"
    },
    {
        "region": "Artvin",
        "country": "tr"
    },
    {
        "region": "Aydin",
        "country": "tr"
    },
    {
        "region": "Balikesir",
        "country": "tr"
    },
    {
        "region": "Bartin",
        "country": "tr"
    },
    {
        "region": "Batman",
        "country": "tr"
    },
    {
        "region": "Bayburt",
        "country": "tr"
    },
    {
        "region": "Bilecik",
        "country": "tr"
    },
    {
        "region": "Bingoel",
        "country": "tr"
    },
    {
        "region": "Bitlis",
        "country": "tr"
    },
    {
        "region": "Bolu",
        "country": "tr"
    },
    {
        "region": "Burdur",
        "country": "tr"
    },
    {
        "region": "Bursa",
        "country": "tr"
    },
    {
        "region": "Canakkale",
        "country": "tr"
    },
    {
        "region": "Cankiri",
        "country": "tr"
    },
    {
        "region": "Corum",
        "country": "tr"
    },
    {
        "region": "Denizli",
        "country": "tr"
    },
    {
        "region": "Diyarbakir",
        "country": "tr"
    },
    {
        "region": "Duezce",
        "country": "tr"
    },
    {
        "region": "Edirne",
        "country": "tr"
    },
    {
        "region": "Elazig",
        "country": "tr"
    },
    {
        "region": "Erzincan",
        "country": "tr"
    },
    {
        "region": "Erzurum",
        "country": "tr"
    },
    {
        "region": "Eskisehir",
        "country": "tr"
    },
    {
        "region": "Gaziantep",
        "country": "tr"
    },
    {
        "region": "Giresun",
        "country": "tr"
    },
    {
        "region": "Guemueshane",
        "country": "tr"
    },
    {
        "region": "Hakkari",
        "country": "tr"
    },
    {
        "region": "Hatay",
        "country": "tr"
    },
    {
        "region": "Igdir",
        "country": "tr"
    },
    {
        "region": "Isparta",
        "country": "tr"
    },
    {
        "region": "Istanbul",
        "country": "tr"
    },
    {
        "region": "Izmir",
        "country": "tr"
    },
    {
        "region": "Kahramanmaras",
        "country": "tr"
    },
    {
        "region": "Karabuek",
        "country": "tr"
    },
    {
        "region": "Karaman",
        "country": "tr"
    },
    {
        "region": "Kars",
        "country": "tr"
    },
    {
        "region": "Kastamonu",
        "country": "tr"
    },
    {
        "region": "Kayseri",
        "country": "tr"
    },
    {
        "region": "Kilis",
        "country": "tr"
    },
    {
        "region": "Kirikkale",
        "country": "tr"
    },
    {
        "region": "Kirklareli",
        "country": "tr"
    },
    {
        "region": "Kirsehir",
        "country": "tr"
    },
    {
        "region": "Kocaeli",
        "country": "tr"
    },
    {
        "region": "Konya",
        "country": "tr"
    },
    {
        "region": "Kuetahya",
        "country": "tr"
    },
    {
        "region": "Malatya",
        "country": "tr"
    },
    {
        "region": "Manisa",
        "country": "tr"
    },
    {
        "region": "Mardin",
        "country": "tr"
    },
    {
        "region": "Mersin",
        "country": "tr"
    },
    {
        "region": "Mugla",
        "country": "tr"
    },
    {
        "region": "Mus",
        "country": "tr"
    },
    {
        "region": "Nevsehir",
        "country": "tr"
    },
    {
        "region": "Nigde",
        "country": "tr"
    },
    {
        "region": "Ordu",
        "country": "tr"
    },
    {
        "region": "Osmaniye",
        "country": "tr"
    },
    {
        "region": "Rize",
        "country": "tr"
    },
    {
        "region": "Sakarya",
        "country": "tr"
    },
    {
        "region": "Samsun",
        "country": "tr"
    },
    {
        "region": "Sanliurfa",
        "country": "tr"
    },
    {
        "region": "Siirt",
        "country": "tr"
    },
    {
        "region": "Sinop",
        "country": "tr"
    },
    {
        "region": "Sirnak",
        "country": "tr"
    },
    {
        "region": "Sivas",
        "country": "tr"
    },
    {
        "region": "Tekirdag",
        "country": "tr"
    },
    {
        "region": "Tokat",
        "country": "tr"
    },
    {
        "region": "Trabzon",
        "country": "tr"
    },
    {
        "region": "Tunceli",
        "country": "tr"
    },
    {
        "region": "Usak",
        "country": "tr"
    },
    {
        "region": "Van",
        "country": "tr"
    },
    {
        "region": "Yalova",
        "country": "tr"
    },
    {
        "region": "Yozgat",
        "country": "tr"
    },
    {
        "region": "Zonguldak",
        "country": "tr"
    }
]
                    });}


                if(req.body.codecode== "tm"){return res.status(200).json({
statesData:[
    {
        "region": "Ahal",
        "country": "tm"
    },
    {
        "region": "Ashgabat",
        "country": "tm"
    },
    {
        "region": "Balkan",
        "country": "tm"
    },
    {
        "region": "Dasoguz Welayaty",
        "country": "tm"
    },
    {
        "region": "Lebap",
        "country": "tm"
    },
    {
        "region": "Mary",
        "country": "tm"
    }
]
                    });}


                if(req.body.codecode== "tc"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "tv"){return res.status(200).json({
statesData:[
    {
        "region": "Funafuti",
        "country": "tv"
    },
    {
        "region": "Nanumanga",
        "country": "tv"
    },
    {
        "region": "Nanumea",
        "country": "tv"
    },
    {
        "region": "Niutao",
        "country": "tv"
    },
    {
        "region": "Nui",
        "country": "tv"
    },
    {
        "region": "Nukufetau",
        "country": "tv"
    },
    {
        "region": "Nukulaelae",
        "country": "tv"
    },
    {
        "region": "Vaitupu",
        "country": "tv"
    }
]
                    });}


                if(req.body.codecode== "ug"){return res.status(200).json({
statesData:[
    {
        "region": "Central Region",
        "country": "ug"
    },
    {
        "region": "Eastern Region",
        "country": "ug"
    },
    {
        "region": "Northern Region",
        "country": "ug"
    },
    {
        "region": "Western Region",
        "country": "ug"
    }
]
                    });}


                if(req.body.codecode== "ua"){return res.status(200).json({
statesData:[
    {
        "region": "Cherkas'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Chernihivs'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Chernivets'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Dnipropetrovska Oblast'",
        "country": "ua"
    },
    {
        "region": "Donets'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Gorod Sevastopol",
        "country": "ua"
    },
    {
        "region": "Ivano-Frankivs'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Kharkivs'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Khersons'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Khmel'nyts'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Kirovohrads'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Kyiv Oblast",
        "country": "ua"
    },
    {
        "region": "L'vivs'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Luhans'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Misto Kyyiv",
        "country": "ua"
    },
    {
        "region": "Mykolayivs'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Odes'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Poltavs'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Republic of Crimea",
        "country": "ua"
    },
    {
        "region": "Rivnens'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Sums'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Ternopil's'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Vinnyts'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Volyns'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Zakarpattia Oblast",
        "country": "ua"
    },
    {
        "region": "Zaporiz'ka Oblast'",
        "country": "ua"
    },
    {
        "region": "Zhytomyrs'ka Oblast'",
        "country": "ua"
    }
]
                    });}


                if(req.body.codecode== "ae"){return res.status(200).json({
statesData:[
    {
        "region": "`Ajman",
        "country": "ae"
    },
    {
        "region": "Abu Zaby",
        "country": "ae"
    },
    {
        "region": "Al Fujayrah",
        "country": "ae"
    },
    {
        "region": "Ash Shariqah",
        "country": "ae"
    },
    {
        "region": "Dubai",
        "country": "ae"
    },
    {
        "region": "Ra's al Khaymah",
        "country": "ae"
    },
    {
        "region": "Umm al Qaywayn",
        "country": "ae"
    }
]
                    });}


                if(req.body.codecode== "us"){return res.status(200).json({
statesData:[
    {
        "region": "Alabama",
        "country": "us"
    },
    {
        "region": "Alaska",
        "country": "us"
    },
    {
        "region": "Arizona",
        "country": "us"
    },
    {
        "region": "Arkansas",
        "country": "us"
    },
    {
        "region": "California",
        "country": "us"
    },
    {
        "region": "Colorado",
        "country": "us"
    },
    {
        "region": "Connecticut",
        "country": "us"
    },
    {
        "region": "Delaware",
        "country": "us"
    },
    {
        "region": "District of Columbia",
        "country": "us"
    },
    {
        "region": "Florida",
        "country": "us"
    },
    {
        "region": "Georgia",
        "country": "us"
    },
    {
        "region": "Hawaii",
        "country": "us"
    },
    {
        "region": "Idaho",
        "country": "us"
    },
    {
        "region": "Illinois",
        "country": "us"
    },
    {
        "region": "Indiana",
        "country": "us"
    },
    {
        "region": "Iowa",
        "country": "us"
    },
    {
        "region": "Kansas",
        "country": "us"
    },
    {
        "region": "Kentucky",
        "country": "us"
    },
    {
        "region": "Louisiana",
        "country": "us"
    },
    {
        "region": "Maine",
        "country": "us"
    },
    {
        "region": "Maryland",
        "country": "us"
    },
    {
        "region": "Massachusetts",
        "country": "us"
    },
    {
        "region": "Michigan",
        "country": "us"
    },
    {
        "region": "Minnesota",
        "country": "us"
    },
    {
        "region": "Mississippi",
        "country": "us"
    },
    {
        "region": "Missouri",
        "country": "us"
    },
    {
        "region": "Montana",
        "country": "us"
    },
    {
        "region": "Nebraska",
        "country": "us"
    },
    {
        "region": "Nevada",
        "country": "us"
    },
    {
        "region": "New Hampshire",
        "country": "us"
    },
    {
        "region": "New Jersey",
        "country": "us"
    },
    {
        "region": "New Mexico",
        "country": "us"
    },
    {
        "region": "New York",
        "country": "us"
    },
    {
        "region": "North Carolina",
        "country": "us"
    },
    {
        "region": "North Dakota",
        "country": "us"
    },
    {
        "region": "Ohio",
        "country": "us"
    },
    {
        "region": "Oklahoma",
        "country": "us"
    },
    {
        "region": "Oregon",
        "country": "us"
    },
    {
        "region": "Pennsylvania",
        "country": "us"
    },
    {
        "region": "Rhode Island",
        "country": "us"
    },
    {
        "region": "South Carolina",
        "country": "us"
    },
    {
        "region": "South Dakota",
        "country": "us"
    },
    {
        "region": "Tennessee",
        "country": "us"
    },
    {
        "region": "Texas",
        "country": "us"
    },
    {
        "region": "Utah",
        "country": "us"
    },
    {
        "region": "Vermont",
        "country": "us"
    },
    {
        "region": "Virginia",
        "country": "us"
    },
    {
        "region": "Washington",
        "country": "us"
    },
    {
        "region": "West Virginia",
        "country": "us"
    },
    {
        "region": "Wisconsin",
        "country": "us"
    },
    {
        "region": "Wyoming",
        "country": "us"
    }
]
                    });}


                if(req.body.codecode== "uy"){return res.status(200).json({
statesData:[
    {
        "region": "Departamento de Artigas",
        "country": "uy"
    },
    {
        "region": "Departamento de Canelones",
        "country": "uy"
    },
    {
        "region": "Departamento de Cerro Largo",
        "country": "uy"
    },
    {
        "region": "Departamento de Colonia",
        "country": "uy"
    },
    {
        "region": "Departamento de Durazno",
        "country": "uy"
    },
    {
        "region": "Departamento de Flores",
        "country": "uy"
    },
    {
        "region": "Departamento de Florida",
        "country": "uy"
    },
    {
        "region": "Departamento de Lavalleja",
        "country": "uy"
    },
    {
        "region": "Departamento de Maldonado",
        "country": "uy"
    },
    {
        "region": "Departamento de Montevideo",
        "country": "uy"
    },
    {
        "region": "Departamento de Paysandu",
        "country": "uy"
    },
    {
        "region": "Departamento de Rio Negro",
        "country": "uy"
    },
    {
        "region": "Departamento de Rivera",
        "country": "uy"
    },
    {
        "region": "Departamento de Rocha",
        "country": "uy"
    },
    {
        "region": "Departamento de Salto",
        "country": "uy"
    },
    {
        "region": "Departamento de San Jose",
        "country": "uy"
    },
    {
        "region": "Departamento de Soriano",
        "country": "uy"
    },
    {
        "region": "Departamento de Tacuarembo",
        "country": "uy"
    },
    {
        "region": "Departamento de Treinta y Tres",
        "country": "uy"
    }
]
                    });}


                if(req.body.codecode== "uz"){return res.status(200).json({
statesData:[
    {
        "region": "Andijan",
        "country": "uz"
    },
    {
        "region": "Bukhara Province",
        "country": "uz"
    },
    {
        "region": "Fergana",
        "country": "uz"
    },
    {
        "region": "Jizzakh Province",
        "country": "uz"
    },
    {
        "region": "Karakalpakstan",
        "country": "uz"
    },
    {
        "region": "Namangan Province",
        "country": "uz"
    },
    {
        "region": "Navoiy Province",
        "country": "uz"
    },
    {
        "region": "Qashqadaryo Province",
        "country": "uz"
    },
    {
        "region": "Samarqand Viloyati",
        "country": "uz"
    },
    {
        "region": "Sirdaryo",
        "country": "uz"
    },
    {
        "region": "Surxondaryo Viloyati",
        "country": "uz"
    },
    {
        "region": "Toshkent Shahri",
        "country": "uz"
    },
    {
        "region": "Toshkent Viloyati",
        "country": "uz"
    },
    {
        "region": "Xorazm Viloyati",
        "country": "uz"
    }
]
                    });}


                if(req.body.codecode== "vu"){return res.status(200).json({
statesData:[
    {
        "region": "Malampa Province",
        "country": "vu"
    },
    {
        "region": "Penama Province",
        "country": "vu"
    },
    {
        "region": "Sanma Province",
        "country": "vu"
    },
    {
        "region": "Shefa Province",
        "country": "vu"
    },
    {
        "region": "Tafea Province",
        "country": "vu"
    },
    {
        "region": "Torba Province",
        "country": "vu"
    }
]
                    });}


                if(req.body.codecode== "ve"){return res.status(200).json({
statesData:[
    {
        "region": "Delta Amacuro",
        "country": "ve"
    },
    {
        "region": "Dependencias Federales",
        "country": "ve"
    },
    {
        "region": "Distrito Capital",
        "country": "ve"
    },
    {
        "region": "Estado Amazonas",
        "country": "ve"
    },
    {
        "region": "Estado Anzoategui",
        "country": "ve"
    },
    {
        "region": "Estado Apure",
        "country": "ve"
    },
    {
        "region": "Estado Aragua",
        "country": "ve"
    },
    {
        "region": "Estado Barinas",
        "country": "ve"
    },
    {
        "region": "Estado Bolivar",
        "country": "ve"
    },
    {
        "region": "Estado Carabobo",
        "country": "ve"
    },
    {
        "region": "Estado Cojedes",
        "country": "ve"
    },
    {
        "region": "Estado Falcon",
        "country": "ve"
    },
    {
        "region": "Estado Guarico",
        "country": "ve"
    },
    {
        "region": "Estado Lara",
        "country": "ve"
    },
    {
        "region": "Estado Merida",
        "country": "ve"
    },
    {
        "region": "Estado Monagas",
        "country": "ve"
    },
    {
        "region": "Estado Nueva Esparta",
        "country": "ve"
    },
    {
        "region": "Estado Portuguesa",
        "country": "ve"
    },
    {
        "region": "Estado Sucre",
        "country": "ve"
    },
    {
        "region": "Estado Tachira",
        "country": "ve"
    },
    {
        "region": "Estado Trujillo",
        "country": "ve"
    },
    {
        "region": "Estado Vargas",
        "country": "ve"
    },
    {
        "region": "Estado Yaracuy",
        "country": "ve"
    },
    {
        "region": "Estado Zulia",
        "country": "ve"
    },
    {
        "region": "Miranda",
        "country": "ve"
    }
]
                    });}


                if(req.body.codecode== "vn"){return res.status(200).json({
statesData:[
    {
        "region": "An Giang",
        "country": "vn"
    },
    {
        "region": "Dak Nong",
        "country": "vn"
    },
    {
        "region": "Gia Lai",
        "country": "vn"
    },
    {
        "region": "Hau Giang",
        "country": "vn"
    },
    {
        "region": "Ho Chi Minh City",
        "country": "vn"
    },
    {
        "region": "Kon Tum",
        "country": "vn"
    },
    {
        "region": "Long An",
        "country": "vn"
    },
    {
        "region": "Thanh Pho Can Tho",
        "country": "vn"
    },
    {
        "region": "Thanh Pho GJa Nang",
        "country": "vn"
    },
    {
        "region": "Thanh Pho Ha Noi",
        "country": "vn"
    },
    {
        "region": "Thanh Pho Hai Phong",
        "country": "vn"
    },
    {
        "region": "Tinh Ba Ria-Vung Tau",
        "country": "vn"
    },
    {
        "region": "Tinh Bac Giang",
        "country": "vn"
    },
    {
        "region": "Tinh Bac Kan",
        "country": "vn"
    },
    {
        "region": "Tinh Bac Lieu",
        "country": "vn"
    },
    {
        "region": "Tinh Bac Ninh",
        "country": "vn"
    },
    {
        "region": "Tinh Ben Tre",
        "country": "vn"
    },
    {
        "region": "Tinh Binh Duong",
        "country": "vn"
    },
    {
        "region": "Tinh Binh GJinh",
        "country": "vn"
    },
    {
        "region": "Tinh Binh Phuoc",
        "country": "vn"
    },
    {
        "region": "Tinh Binh Thuan",
        "country": "vn"
    },
    {
        "region": "Tinh Ca Mau",
        "country": "vn"
    },
    {
        "region": "Tinh Cao Bang",
        "country": "vn"
    },
    {
        "region": "Tinh Dien Bien",
        "country": "vn"
    },
    {
        "region": "Tinh GJak Lak",
        "country": "vn"
    },
    {
        "region": "Tinh GJong Nai",
        "country": "vn"
    },
    {
        "region": "Tinh GJong Thap",
        "country": "vn"
    },
    {
        "region": "Tinh Ha Giang",
        "country": "vn"
    },
    {
        "region": "Tinh Ha Nam",
        "country": "vn"
    },
    {
        "region": "Tinh Ha Tinh",
        "country": "vn"
    },
    {
        "region": "Tinh Hai Duong",
        "country": "vn"
    },
    {
        "region": "Tinh Hoa Binh",
        "country": "vn"
    },
    {
        "region": "Tinh Hung Yen",
        "country": "vn"
    },
    {
        "region": "Tinh Khanh Hoa",
        "country": "vn"
    },
    {
        "region": "Tinh Kien Giang",
        "country": "vn"
    },
    {
        "region": "Tinh Lai Chau",
        "country": "vn"
    },
    {
        "region": "Tinh Lam GJong",
        "country": "vn"
    },
    {
        "region": "Tinh Lang Son",
        "country": "vn"
    },
    {
        "region": "Tinh Lao Cai",
        "country": "vn"
    },
    {
        "region": "Tinh Nam GJinh",
        "country": "vn"
    },
    {
        "region": "Tinh Nghe An",
        "country": "vn"
    },
    {
        "region": "Tinh Ninh Binh",
        "country": "vn"
    },
    {
        "region": "Tinh Ninh Thuan",
        "country": "vn"
    },
    {
        "region": "Tinh Phu Tho",
        "country": "vn"
    },
    {
        "region": "Tinh Phu Yen",
        "country": "vn"
    },
    {
        "region": "Tinh Quang Binh",
        "country": "vn"
    },
    {
        "region": "Tinh Quang Nam",
        "country": "vn"
    },
    {
        "region": "Tinh Quang Ngai",
        "country": "vn"
    },
    {
        "region": "Tinh Quang Ninh",
        "country": "vn"
    },
    {
        "region": "Tinh Quang Tri",
        "country": "vn"
    },
    {
        "region": "Tinh Soc Trang",
        "country": "vn"
    },
    {
        "region": "Tinh Son La",
        "country": "vn"
    },
    {
        "region": "Tinh Tay Ninh",
        "country": "vn"
    },
    {
        "region": "Tinh Thai Binh",
        "country": "vn"
    },
    {
        "region": "Tinh Thai Nguyen",
        "country": "vn"
    },
    {
        "region": "Tinh Thanh Hoa",
        "country": "vn"
    },
    {
        "region": "Tinh Thua Thien-Hue",
        "country": "vn"
    },
    {
        "region": "Tinh Tien Giang",
        "country": "vn"
    },
    {
        "region": "Tinh Tra Vinh",
        "country": "vn"
    },
    {
        "region": "Tinh Tuyen Quang",
        "country": "vn"
    },
    {
        "region": "Tinh Vinh Long",
        "country": "vn"
    },
    {
        "region": "Tinh Vinh Phuc",
        "country": "vn"
    },
    {
        "region": "Tinh Yen Bai",
        "country": "vn"
    }
]
                    });}


                if(req.body.codecode== "vg"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "vi"){return res.status(200).json({
statesData:[
    {
        "region": "Saint Croix Island",
        "country": "vi"
    },
    {
        "region": "Saint John Island",
        "country": "vi"
    },
    {
        "region": "Saint Thomas Island",
        "country": "vi"
    }
]
                    });}


                if(req.body.codecode== "wf"){return res.status(200).json({
statesData:[
    {
        "region": "Alo",
        "country": "wf"
    },
    {
        "region": "Sigave",
        "country": "wf"
    },
    {
        "region": "Uvea",
        "country": "wf"
    }
]
                    });}


                if(req.body.codecode== "eh"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "ye"){return res.status(200).json({
statesData:[
    {
        "region": "Al Bayda Governorate",
        "country": "ye"
    },
    {
        "region": "Al Mahrah",
        "country": "ye"
    },
    {
        "region": "Al Mahwit",
        "country": "ye"
    },
    {
        "region": "Amanat Al Asimah",
        "country": "ye"
    },
    {
        "region": "Ibb",
        "country": "ye"
    },
    {
        "region": "Muhafazat `Amran",
        "country": "ye"
    },
    {
        "region": "Muhafazat 'Adan",
        "country": "ye"
    },
    {
        "region": "Muhafazat Abyan",
        "country": "ye"
    },
    {
        "region": "Muhafazat ad Dali'",
        "country": "ye"
    },
    {
        "region": "Muhafazat al Hudaydah",
        "country": "ye"
    },
    {
        "region": "Muhafazat al Jawf",
        "country": "ye"
    },
    {
        "region": "Muhafazat Dhamar",
        "country": "ye"
    },
    {
        "region": "Muhafazat Hadramawt",
        "country": "ye"
    },
    {
        "region": "Muhafazat Hajjah",
        "country": "ye"
    },
    {
        "region": "Muhafazat Lahij",
        "country": "ye"
    },
    {
        "region": "Muhafazat Ma'rib",
        "country": "ye"
    },
    {
        "region": "Muhafazat Raymah",
        "country": "ye"
    },
    {
        "region": "Muhafazat Sa'dah",
        "country": "ye"
    },
    {
        "region": "Muhafazat Ta`izz",
        "country": "ye"
    },
    {
        "region": "Sanaa",
        "country": "ye"
    },
    {
        "region": "Shabwah",
        "country": "ye"
    },
    {
        "region": "Socotra",
        "country": "ye"
    }
]
                    });}


                if(req.body.codecode== "zr"){return res.status(200).json({
statesData:[]
                    });}


                if(req.body.codecode== "zm"){return res.status(200).json({
statesData:[
    {
        "region": "Central Province",
        "country": "zm"
    },
    {
        "region": "Copperbelt Province",
        "country": "zm"
    },
    {
        "region": "Eastern Province",
        "country": "zm"
    },
    {
        "region": "Luapula Province",
        "country": "zm"
    },
    {
        "region": "Lusaka Province",
        "country": "zm"
    },
    {
        "region": "Muchinga Province",
        "country": "zm"
    },
    {
        "region": "North-Western Province",
        "country": "zm"
    },
    {
        "region": "Northern Province",
        "country": "zm"
    },
    {
        "region": "Southern Province",
        "country": "zm"
    },
    {
        "region": "Western Province",
        "country": "zm"
    }
]
                    });}


                if(req.body.codecode== "zw"){return res.status(200).json({
statesData:[
    {
        "region": "Bulawayo Province",
        "country": "zw"
    },
    {
        "region": "Harare Province",
        "country": "zw"
    },
    {
        "region": "Manicaland Province",
        "country": "zw"
    },
    {
        "region": "Mashonaland Central Province",
        "country": "zw"
    },
    {
        "region": "Mashonaland East Province",
        "country": "zw"
    },
    {
        "region": "Mashonaland West Province",
        "country": "zw"
    },
    {
        "region": "Masvingo Province",
        "country": "zw"
    },
    {
        "region": "Matabeleland North Province",
        "country": "zw"
    },
    {
        "region": "Matabeleland South Province",
        "country": "zw"
    },
    {
        "region": "Midlands Province",
        "country": "zw"
    }
]
                    });}




});
router.post('/GetCitizesByCID', function(req, res, next){

    AuthController.GetCitizesByCID(req, res, next)
});
router.post('/GetCitizesBySID', function(req, res, next){

    AuthController.GetCitizesBySID(req, res, next)
});
router.post('/changepass', function(req, res, next){

    AuthController.resetPassworddashborad(req, res, next)
});
router.get('/confirmationEmail/:id', function(req, res, next){

    AuthContnroller.confirmUser(req, res, next)
});


router.post('/sendResetEmail', function(req, res, next){
    AuthController.sendResetEmail(req, res, next)
});

router.post('/sendResetToken', function(req, res, next){
    AuthController.receivedResetToken(req, res, next)
});
router.post('/new_pass', function(req, res, next) {
   AuthController.newPass(req, res, next);
});
router.post('/change_pass', function(req, res, next) {
   AuthController.changePass(req, res, next);
});
router.post('/new_pass_on_login', function(req, res, next) {
    AuthController.newPass(req, res, next);
});

router.post('/update_profile', function(req, res, next) {
   AuthController.updateProfile(req, res, next);
});
const storeRedirectToInSession = (req, res, next) => {
    const redirectTo = req.headers.referer;
    req.session.redirectTo = redirectTo;
    next();
};


// Payment

router.post('/buy', function(req, res, next){
    paymentController.stripeBuy(req, res, next)
});
router.post('/sell', function(req, res, next){
    paymentController.stripeSell(req, res, next)
});
router.post('/get_payment_database', function(req, res, next){
    paymentController.getPaymentDatabase(req, res, next)
});
router.post('/get_total_token', function(req, res, next){
    paymentController.getTotalToken(req, res, next)
});
// ThirdParty
router.post('/thirdparty1', function (req, res, next) {
    ThirdParty.thirdparty1(req, res, next)
});
router.post('/thirdparty2', function (req, res, next) {
    ThirdParty.thirdparty2(req, res, next)
});



module.exports = router;
