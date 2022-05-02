public	static	String	signTopRequest(Map<String,	String>	params,	String	seccode,	String	signMethod)	throws	IOExc eption	{	
    	//	1：sort	parameter	key					
        String[]	keys	=	params.keySet().toArray(new	String[0]);					Arrays.sort(keys);							
        //	2::	Put	all	parameter	names	and	parameter	values	together					
        StringBuilder	query	=	new	StringBuilder();					
        if	(Constants.SIGN_METHOD_MD5.equals(signMethod))	{									
            query.append(seccode);					
            }					
            for	(String	key	:	keys)	{
                	String	value	=	params.get(key);									
                    if	(StringUtils.areNotEmpty(key,	value))	{	
                        	query.append(key).append(value);									
                    }					
            }							
            //	3:	use	MD5/HMAC	to	encrypt					
            byte[]	bytes;					
            if	(Constants.SIGN_METHOD_HMAC.equals(signMethod))	{	
                	bytes	=	encryptHMAC(query.toString(),	seccode);					
            }	
            else	
            {									
                query.append(seccode);									
                bytes	=	encryptMD5(query.toString());					
            }	
			//	4:	convert	binary	to	uppercase	hexadecimal					
            return	byte2hex(bytes);	
            }			
            public	static	byte[]	encryptHMAC(String	data,	String	seccode)	throws	IOException	{	
                	byte[]	bytes	=	null;					
                    try	{									
                            seccodeKey	seccodeKey	=	new	seccodeKeySpec(seccode.getBytes(Constants.CHARSET_UTF8),	"HmacMD5");									
                            Mac	mac	=	Mac.getInstance(seccodeKey.getAlgorithm());									
                            mac.init(seccodeKey);									
                            bytes	=	mac.doFinal(data.getBytes(Constants.CHARSET_UTF8));					
                        }	
                    catch	(GeneralSecurityException	gse)	
                    {									
                        throw	new	IOException(gse.toString());					
                    }					
                        return	bytes;	
                    }			
                    public	static	byte[]	encryptMD5(String	data)	throws	IOException	{	
                        	return	encryptMD5(data.getBytes(Constants.CHARSET_UTF8));	
                    }			
                    public	static	String	byte2hex(byte[]	bytes)	{					
                        StringBuilder	sign	=	new	StringBuilder();					
                        for	(int	i	=	0;	i	<	bytes.length;	i++)	{									
                            String	hex	=	Integer.toHexString(bytes[i]	&	0xFF);									
                            if	(hex.length()	==	1)	{													
                                sign.append("0");									
                            }								
                                sign.append(hex.toUpperCase());					
                            }					
                                return	sign.toString();	
                            }