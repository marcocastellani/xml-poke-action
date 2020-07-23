# Xml poke action

This action uses node version of xml poke to perform clean and transformations

## Inputs

### `file-glob`

**Required** The file name or glob expression.

### `select`

**Required** The xml poke XPath select.

### `set`

The argument for xml.set method of xml poke.

### `clear`

The argument for xml.clear method of xml poke.

### `remove`

The argument for xml.remove method of xml poke.

### `namespace`

The namespace to add

### `namespace-alias`

The namespace-alias to add

## Outputs

### `result`

The poked file content.

## Example usage

    name: set versionCode
    uses: marcocastellani/xml-poke@v5
    with:
      file-glob: "AndroidManifest.xml"
      select: "manifest/@android:versionCode"
      set: 123
      namespace: "http://schemas.android.com/apk/res/android"
      namespace-alias: android
