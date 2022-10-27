export const fetchData = (searchParams, setRequestData) => {
   let { title, category, sort } = Object.fromEntries([...searchParams]);

   setRequestData({ title, category, sort });
}

export const setURLParams = (e, searchParams) => {
   switch (e.currentTarget.name) {
      case 'title':
         e.currentTarget.value ? searchParams.set('title', e.currentTarget.value) : searchParams.delete('title');
         break;
      case 'category':
         searchParams.set('category', e.currentTarget.value);
         break;
      case 'sort':
         searchParams.set('sort', e.currentTarget.value);
         break;
      default:
         break;
   }

}