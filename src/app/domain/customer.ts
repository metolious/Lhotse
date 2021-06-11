export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: string;
    name?: string;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    activity?: number;
    representative?: Representative;
    revoke?: boolean;
    state?: string;
    image?: string;
}

export interface ImageData {
    showall?: string; // insert dynamic dialog link to json file
    version?: string; // insert multi-select button
    state?: string;
    review?: string; // blank or insert link to edit page 
    revoke?: string; // blank or insert button w/ image
    classification?: string;
    rekey?: string; // blank or insert button w/ image
    primary?: boolean; // blank or link + path to image
    distribute?: boolean; // blank or link + path to image
    sconum?: string;
}
