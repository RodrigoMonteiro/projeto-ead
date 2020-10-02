module.exports = app => {
   const save = (req, res) => {
       res.save('user send')
   }
   return {save}
}