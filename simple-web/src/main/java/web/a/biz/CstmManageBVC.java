package web.a.biz;

import java.util.Map;

import web.a.dvo.CstmDVO;
import web.a.svo.CstmSVO;
import web.z.util.SearchVO;

public interface CstmManageBVC {

	/**
	 * 고객정보를 등록 한다.
	 * 
	 * @exception Exception Exception
	 */
	public void insertCstm(CstmSVO cstmSVO) throws Exception;

	/**
     * 조건에 맞는 게시물 목록을 조회 한다.
     *
     */
    public Map<String, Object> listCstm(SearchVO searchVO) throws Exception;
    

	/**
     * 상세 조회 한다.
     *
     */
    public CstmDVO detailCstm(CstmSVO cstmSVO) throws Exception;

    /**
	 * 고객정보를 수정 한다.
	 * 
	 */
	public void updateCstm(CstmSVO svo) throws Exception;

	/**
	 * 고객정보를 삭제 한다.
	 * 
	 * @exception Exception Exception
	 */
	public void deleteCstm(CstmSVO cstmSVO) throws Exception;
}
