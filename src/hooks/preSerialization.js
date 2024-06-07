const preSerializationHook = (request, reply, payload, done) => {
    if (payload && payload.items && Array.isArray(payload.items)) {
      payload.items = payload.items.map(item => {
        const { _id, __v, ...rest } = item;
        return { id: _id, ...rest };
      });
    } else if (payload && payload._id) {
      const { _id, __v, ...rest } = payload;
      payload = { id: _id, ...rest };
    }

    done(null, payload);
  };
  
  export default preSerializationHook;
  