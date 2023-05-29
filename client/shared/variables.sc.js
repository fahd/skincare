const s = {};
// Body

// Header

// Borders

// Brands

//Gradient

// Typography


// Fonts

// Buttons

// Inputs

// Panels

//== Media queries breakpoints

// Extra small screen / phone
s.screenXS = '480px';
s.screenXsMin = '481px'

// Small screen / tablet
s.screenSm = '768px';
s.screenSmMin = s.screenSm;

// Medium screen / desktop
s.screenMd = '1024px';
s.screenMdMin = s.screenMd;

// Large screen / wide desktop
s.screenLg = '1200px';
s.screenLgMin = s.screenLg;

// So media queries don't overlap when required, provide a maximum
s.screenXsMax = s.screenSmMin - 1;
s.screenSmMax = s.screenMdMin - 1;
s.screenMdMax = s.screenLgMin - 1;

s.screen = `only screen`;
s.xsDown= `${s.screen} and (max-width: ${s.screenXs}), ${s.screen} and (max-height: ${s.screenXs})`;
s.xsUp = `${s.screen} and (min-width: ${s.screenXsMin})`;
s.xsOnly = `${s.screen} and (max-width: ${s.screenXsMax})`;

s.smDown = `${s.screen} and (max-width: ${s.screenSm})`;
s.smUp =  `${s.screen} and (min-width: ${s.screenSmMin})`;
s.smOnly = `${s.screen} and (min-width: ${s.screenSmMin}) and (max-width: ${s.screenSmMax})`;

s.mdDown = `${s.screen} and (max-width: ${s.screenMd})`;
s.lgDown = `${s.screen} and (max-width: ${s.screenLg})`;

s.mdUp = `${s.screen} and (min-width: ${s.screenMdMax})`;
s.mdOnly = `${s.screen} and (min-width: ${s.screenMdMin}) and (max-width: ${s.screenMdMax})`;

s.lgUp = `${s.screen} and (min-width: ${s.screenLgMin})`;

// -ms-high-contrast supports two values: none and active.
// To target IE10+ regardless of the property’s setting, use this media query:
s.ms= `all and (-ms-high-contrast: none), (-ms-high-contrast: active)`;
// Viewport width specific styling for Internet Explorer
s.msMdDown = `${s.screen} and (max-width: ${s.screenMd}), and (-ms-high-contrast: none), (-ms-high-contrast: active)`;
s.msSmDown = `${s.screen} and (max-width: ${s.screenSm}), and (-ms-high-contrast: none), (-ms-high-contrast: active)`;
s.msXsDown = `${s.screen} and (max-width: ${s.screenXs}), and (-ms-high-contrast: none), (-ms-high-contrast: active)`;

export default s;