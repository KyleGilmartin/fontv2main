import { signine, signinp, registerp, registere,coordl,coords} from './compute'


describe('[signin] - should check user email address is invalied', () => {
    it('it should contian the email', () => {
        let at = '@';
        expect(signine('')).toContain('' + at +'');
  })
    
})


describe('[signin] - should check user password is invalied', () => {
    it(' password', () => {
       let user = null;
        let min = 5;
        let password = user.password;
        let lenght = password.length;
        if (lenght > min) {
           expect(registerp('')).toContain(password);
        }
  })
    
})

describe('[register email] - should check user email is invalied', () => {
    it('it should contian the email', () => {
        expect(registere('')).toContain('');
  })
    
})
describe('[register passoword] - should check user password is invalied', () => {
    it(' password', () => {
        let user = null;
        let min = 5;
        let password = user.password;
        let lenght = password.length;
        if (lenght > min) {
           expect(registerp('')).toContain(password);
        }
       
  })
    
})

describe('[lon] - should check user lon is invalied', () => {
    it(' lon', () => {
        let lon = '.';
        expect(coordl('')).toContain(''+ lon+'');
  })
    
})
describe('[lat] - should check user lat is invalied', () => {
    it(' lat', () => {
        let lat = '.';
        expect(coords('')).toContain(''+lat+'');
  })
    
})
