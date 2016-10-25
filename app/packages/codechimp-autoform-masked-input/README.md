[![Build Status](https://travis-ci.org/mbabauer/codechimp-autoform-masked-input.svg)](https://travis-ci.org/mbabauer/codechimp-autoform-masked-input)

AutoForm Masked Input
=====================

AutoForm Masked Input is a plugin for the [AutoForm][autoform] that allows for use of [Igor Escobar's jQuery Masked Plugin][jqmaskplugin] within your form.

## Usage
To add an automask, simply set the autoform type to `masked-input` and provide the desired mask and options, like this:
```javascript
Schemas.Example = new SimpleSchema({
    phone: {
        type: String,
        autoform: {
            type: 'masked-input',
            mask: '(000) 000-0000',
            maskOptions: {
                placeholder: '(___) ___-____'
            }
        }
    }
});
```
The `mask` will default to `"00/00/0000"` if one is not provided.  Any values you place in the `maskOptions` will be passed to the `Mask Plugin` directly.  See the documentation [here][jqmaskplugin] for more details on what options can be passed in.

   [autoform]: <https://github.com/aldeed/meteor-autoform>
   [jqmaskplugin]: <http://igorescobar.github.io/jQuery-Mask-Plugin/>
