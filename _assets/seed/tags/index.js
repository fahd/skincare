import { tags, nestedTags } from './tags';

const saveTypes = (types, tagIds, nestedTagIds) => {
  const main = types[0];
  if (tags.hasOwnProperty(main)) tagIds.add(tags[main])

  for (let i = 1; i < types.length; i++){
    if (i === types.length - 1) {
      let last = types[i].split(" ");
      for (let j = 0; j < last.length; j++){
        let typeFromProductName = last[j];
        if (tags.hasOwnProperty(typeFromProductName)) tagIds.add(tags[typeFromProductName]);
        if (nestedTags.hasOwnProperty(typeFromProductName)) nestedTagIds.add(nestedTags[typeFromProductName])
      }
    }
    else {
      let type = types[i];

      if (main === 'Men' && type === 'Styling') {
        nestedTagIds.add(66)
      }
      else {
        if (tags.hasOwnProperty(type)) tagIds.add(tags[type]);
        if (nestedTags.hasOwnProperty(type)) nestedTagIds.add(nestedTags[type])
      }
    }
  }
}

export {
  saveTypes
}