describe('mvUser',function(){
    beforeEach(module('app'));
    describe('isAdmin', function(){
        it('should return false if user id not has a ADMIN role', inject(function(mvUser){
            var user = new mvUser();
            user.roles = ['not admin'];
            expect(user.isAdmin()).to.be.falsey;
        }));
        it('return true if user id in ADMIN role', inject(function(mvUser){
            var user = new mvUser();
            user.roles = ['admin'];
            expect(user.isAdmin()).to.be.falsey;
            expect(user.isAdmin()).to.be.true;
        }));
    });
});