import Config from '../src/config';

function _config() {
    return new Config( {
        debugging : false,
        script : {
            external : false,
            localcache : {
                set : {
                    page : true,
                    persistent : {
                        md5 : true,
                        cookie : true
                    },
                    priority : 51
                }
            }
        }
    } );
}

describe( 'Config', () => {

    it( 'should throw error if default value is not an object', () => {
        expect( () => {
            new Config( 'abc' ) 
        } ).toThrow( new TypeError( 'Expect an Object for default config value.' ) );

        expect( () => {
            _config().set( [] ); 
        } ).toThrow( new TypeError( 'Expect an Object for default config value.' ) );
    } );

    it( 'get existing value', () => {
        const config = _config();
        expect( config.get( 'debugging' ) ).toBeFalsy( );
        expect( config.get( 'script.external' ) ).toBeFalsy();
        expect( config.get( 'script.localcache.set.persistent' ) ).toEqual( {
            md5 : true,
            cookie : true
        } );
    } );

    it( 'get nonexisting value', () => {
        const config = _config();
        expect( config.get( 'xxx' ) ).toEqual( undefined );
        expect( config.get( 'script.xxx' ) ).toEqual( undefined );
        expect( config.get( 'xxx', 'abc' ) ).toEqual( 'abc' );
    } );

    it( 'set value', () => {
        const config = _config();
        config.set( 'debugging', true );
        config.set( 'script.external', true );
        config.set( 'script.localcache.set.persistent', { lifetime : 1000 } );
        expect( config.get( 'debugging' ) ).toBeTruthy();
        expect( config.get( 'script.external' ) ).toBeTruthy();
        expect( config.get( 'script.localcache.set.persistent' ) ).toEqual( { lifetime : 1000 } );
    } );

    it( 'set value with nonexisting path', () => {
        const config = _config();
        config.set( 'test', '100' );
        config.set( 'a.b.c', '100' );
        expect( config.get( 'test' ) ).toEqual( '100' );
        expect( config.get( 'a.b.c' ) ).toEqual( '100' );
    } );

    it( 'replace whole value', () => {
        const config = _config();
        config.set( { test : '123' } );
        expect( config.get() ).toEqual( { test : '123' } );
    } );

    it( 'should have gotten "undefined"', () => {
        const config = new Config( {
            x : null
        } );
        expect( config.get( 'x.a.b.c' ) ).toEqual( undefined );
        expect( config.get( 'a' ) ).toEqual( undefined );
    } );

} );
