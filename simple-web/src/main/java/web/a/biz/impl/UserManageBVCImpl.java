package web.a.biz.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Service;

import egovframework.let.utl.sim.service.EgovFileScrty;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import web.a.biz.UserManageBVC;
import web.a.dao.UserManageDAO;
import web.a.dvo.UserDVO;
import web.a.svo.UserSVO;
import web.z.util.SearchVO;
import web.z.util.WebUtil;

@Service("UserManageBVC")
public class UserManageBVCImpl  extends EgovAbstractServiceImpl implements UserManageBVC {

    @Resource(name = "UserManageDAO")
    private UserManageDAO userManageDAO;

	/**
	 * 정보를 등록 한다.
	 * 
	 * @exception Exception Exception
	 */
	@Override
	public void insert(UserSVO svo) throws Exception{

		UserDVO dvo = new UserDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);

		// dao etc set
		WebUtil.getEtcInfo(dvo, svo.getScreenId());
		
		// id 채번
		dvo.setUserNo(userManageDAO.getId());
		
		// 처음 가입시 무조건 입력한 아이디뒤에 !12 붙여서 비밀번호를 만든다. ( 예 : 아이디 aaa -> 비밀번호 aaa!12 )
		String enpassword = EgovFileScrty.encryptPassword(dvo.getUserId().concat("!12"), dvo.getUserId());
		dvo.setPswd(enpassword);
		
		// default 값 셋팅
		
		// 자료상태구분코드
		dvo.setMateStatClCd("01");
		
		// 저장
		userManageDAO.insert(dvo);
	}

	/**
     * 조건에 맞는 게시물 목록을 조회 한다.
     *
     */
	@Override
	public Map<String, Object> list(SearchVO searchVO) throws Exception {
		
		int totalCnt = userManageDAO.selectTotalCnt(searchVO);

		// 페이지 카운트가 2이상이면 결과값이 나오지 않아서 아래 로직을 추가함.
		if(totalCnt <= 10) {

	    	searchVO.setFirstIndex(0);
		}
		
		List<UserDVO> result = userManageDAO.selectList(searchVO);

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(totalCnt));

		return map;
	};
	
	/**
     * 상세 조회 한다.
     *
     */
    public UserDVO detail(UserSVO svo) throws Exception{

        UserDVO dvo = new UserDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);
		
		return userManageDAO.detail(dvo);
    }
    
    /**
	 * 정보를 수정 한다.
	 * 
	 * @exception Exception Exception
	 */
	@Override
	public void update(UserSVO svo) throws Exception{

		UserDVO dvo = new UserDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);

		// dao etc set
		WebUtil.getEtcInfo(dvo, svo.getScreenId());
		
		// 자료상태구분코드
		dvo.setMateStatClCd("01");
		
		// 저장
		userManageDAO.update(dvo);
	}


	/**
	 * 정보를 삭제 한다.
	 * 
	 * @exception Exception Exception
	 */
	public void delete(UserSVO svo) throws Exception{

		UserDVO dvo = new UserDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);

		// dao etc set
		WebUtil.getEtcInfo(dvo, svo.getScreenId());
		
		// 삭제
		userManageDAO.delete(dvo);
	}
	
	
}
