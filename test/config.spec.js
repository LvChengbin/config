import Config from '../src/config';

const config = new Config( {
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

describe( 'Config', () => {

    it( 'should throw error if default value is not an object', () => {
        expect( () => {
            new Config( 'abc' ) 
        } ).toThrow( new TypeError( 'Expect an Object for default config value.' ) );

        expect( () => {
            config.set( [] ); 
        } ).toThrow( new TypeError( 'Expect an Object for default config value.' ) );
    } );

    it( 'get exitent value', () => {
        expect( config.get( 'debugging' ) ).toBeFalsy( );
        expect( config.get( 'script.external' ) ).toBeFalsy();
        expect( config.get( 'script.localcache.set.persistent' ) ).toEqual( {
            md5 : true,
            cookie : true
        } );
    } );

    it( 'get nonexistent value', () => {
        expect( config.get( 'xxx' ) ).toEqual( undefined );
        expect( config.get( 'script.xxx' ) ).toEqual( undefined );
        expect( config.get( 'xxx', 'abc' ) ).toEqual( 'abc' );
    } );

    it( 'set value', () => {
        config.set( 'debugging', true );
        config.set( 'script.external', true );
        config.set( 'script.localcache.set.persistent', { lifetime : 1000 } );
        expect( config.get( 'debugging' ) ).toBeTruthy();
        expect( config.get( 'script.external' ) ).toBeTruthy();
        expect( config.get( 'script.localcache.set.persistent' ) ).toEqual( { lifetime : 1000 } );
    } );

    it( 'set value with nonexistent path', () => {
        config.set( 'test', '100' );
        config.set( 'a.b.c', '100' );
        expect( config.get( 'test' ) ).toEqual( '100' );
        expect( config.get( 'a.b.c' ) ).toEqual( '100' );
    } );

    it( 'replace whole value', () => {
        config.set( { test : '123' } );
        expect( config.get() ).toEqual( { test : '123' } );
    } );

} );
