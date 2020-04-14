const me = async (obj, args, context) => {
  console.log('QUERY: me');
  await context.services.user.search();
};

export default me;
